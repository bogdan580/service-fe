import {
  Directive, ElementRef, EventEmitter, Input,
  OnDestroy, OnInit, Output
} from '@angular/core';
import {fromEvent, Subject, timer} from 'rxjs';
import {debounce, distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[ngxDelayedInput]'
})
export class DelayedInputDirective implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  @Input() delayTime = 500;
  @Output() delayedInput = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef<HTMLInputElement>) {
  }

  ngOnInit() {
    fromEvent(this.elementRef.nativeElement, 'input')
      .pipe(
        debounce(() => timer(this.delayTime)),
        distinctUntilChanged(
          null,
          (event: Event) => (event.target as HTMLInputElement).value
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(e => this.delayedInput.emit(e));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
