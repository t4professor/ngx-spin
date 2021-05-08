import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, timer } from 'rxjs';
import {
  debounce,
  distinctUntilChanged,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

export type SpinSizeType = 'large' | 'default' | 'small';

@Component({
  selector: 'ngx-spin',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #defaultTemplate>
      <span class="ngx-spin-circle"></span>
    </ng-template>
    <div *ngIf="isLoading">
      <div
        class="ngx-spin"
        [class.ngx-spin-spinning]="isLoading"
        [class.ngx-spin-lg]="size === 'large'"
        [class.ngx-spin-sm]="size === 'small'"
      >
        <ng-template
          [ngTemplateOutlet]="indicator || defaultTemplate"
        ></ng-template>
      </div>
    </div>
    <div
      *ngIf="!simple"
      class="ngx-spin-container"
      [class.ngx-spin-blur]="isLoading"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ngx-spin.component.scss'],
})
export class NgxSpinComponent implements OnChanges, OnDestroy, OnInit {
  @Input() indicator: TemplateRef<any> | null = null;
  @Input() size: SpinSizeType = 'default';
  @Input() delay = 0;
  @Input() simple = false;
  @Input() spinning = true;

  @HostBinding('class.ngx-spin-nested-loading')
  get isNestedLoading(): boolean {
    return !this.simple;
  }

  private destroy$ = new Subject<void>();
  private spinning$ = new BehaviorSubject(this.spinning);
  private delay$ = new ReplaySubject<number>(1);
  isLoading = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const loading$ = this.delay$.pipe(
      startWith(this.delay),
      distinctUntilChanged(),
      switchMap((delay) => {
        if (delay === 0) {
          return this.spinning$;
        }

        return this.spinning$.pipe(
          debounce((spinning) => timer(spinning ? delay : 0))
        );
      }),
      takeUntil(this.destroy$)
    );
    loading$.subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { spinning, delay } = changes;
    if (spinning) {
      this.spinning$.next(this.spinning);
    }
    if (delay) {
      this.delay$.next(this.delay);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
