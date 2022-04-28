import { Directive, ElementRef, EventEmitter, Host, Output } from '@angular/core';

@Directive({
  selector: '[enterViewPort]'
})
export class EnterViewPortDirective {
  @Output() visibilityChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() ratioChange: EventEmitter<number> = new EventEmitter<number>();

  private _observer: IntersectionObserver | undefined;

  constructor(@Host() private _elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const navHeight = <number>document.querySelector(".navbar")?.clientHeight * -1;

    const options = {
      root: null,
      rootMargin: `${navHeight}px 0px 0px 0px`,
      threshold: [0, 0.1, 0.2, 0.3]
    };

    this._observer = new IntersectionObserver(this._callback, options);

    this._observer.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy() {
    this._observer?.disconnect();
  }

  private _callback = (entries: any[], observer: any) => {
    entries.forEach(entry => {
      this.ratioChange.emit(entry.intersectionRatio);
/*
      if (entry.isIntersecting) {
        this.ratioChange.emit(entry.intersectionRatio);
      }*/
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    });
  };
}