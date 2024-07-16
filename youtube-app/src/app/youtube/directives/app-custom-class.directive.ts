import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomClass]',
})
export class AppCustomClassDirective implements OnInit {
  @Input('appCustomClass') publishedAt!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    console.log('директива работает');
    this.changeClass();
  }

  changeClass() {
    let className = 'unknown-status';
    if (this.isOlderThanSixMonths(this.publishedAt)) {
      className = 'older-than-six-months';
    } else if (this.isBetweenOneAndSixMonths(this.publishedAt)) {
      className = 'between-one-and-six-months';
    } else if (this.isBetweenSevenDaysAndOneMonth(this.publishedAt)) {
      className = 'between-seven-days-and-one-month';
    } else if (this.isNewerThanSevenDays(this.publishedAt)) {
      className = 'newer-than-seven-days';
    }
    this.renderer.addClass(this.el.nativeElement, className);
  }

  isOlderThanSixMonths(publishedAt: string): boolean {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setHours(0, 0, 0, 0);
    return new Date(publishedAt) <= sixMonthsAgo;
  }

  isBetweenOneAndSixMonths(publishedAt: string): boolean {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0);

    return (
      new Date(publishedAt) > sixMonthsAgo &&
      new Date(publishedAt) <= oneMonthAgo
    );
  }

  isBetweenSevenDaysAndOneMonth(publishedAt: string): boolean {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return (
      new Date(publishedAt) > oneMonthAgo &&
      new Date(publishedAt) <= sevenDaysAgo
    );
  }

  isNewerThanSevenDays(publishedAt: string): boolean {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return new Date(publishedAt) > sevenDaysAgo;
  }
}
