import { of, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { IBreadcrumb } from '../../components/page-breadcrumb/ibreadcrumb';
import { ICourse, Course } from '../../models/course';

import { DurationPipe } from '../../components/duration-pipe/duration.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverviewPageComponent implements OnInit, OnDestroy {
  private static readonly itemLoremDesc = `
  «Дорожная карта» подписана в рамках достигнутых ранее правительствами двух стран договоренностей и рассчитана на год.
  В ней прописаны мероприятия, которые будут способствовать «скорейшему урегулированию ситуации»
  по снятию взаимных ограничений на поставки продукции. Так, с 11 июня Россельхознадзор снимает временные ограничения на поставки
  продукции четырех белорусских предприятий — производителей мяса и комбикормов: ОАО «Витебская бройлерная птицефабрика»,
  ООО «Вахавяк Плюс», ООО «Гродненский мясокомбинат», ООО «Белэкотехника». С 11 июня Россельхознадзор сможет восстановить
  право экспорта молочной продукции еще для трех белорусских предприятий, если будут предоставлены документы о
  проведении лабораторного мониторинга по группам риска, определенным российской службой.
  Вместе с тем представитель Россельхознадзора указывает, что Беларусь продолжает поставлять в Россию продукцию с многочисленными
  нарушениями требований законодательства ЕАЭС. С 9 июня ведомство ограничивает поставки продукции ОАО «Витебский мясокомбинат»
  (из-за бактерий кишечной палочки в говядине) и витебского ОАО «Молоко» (в питьевом молоке с этого предприятия был выявлен альбендазол).
  Для продукции еще шести предприятий вводится режим усиленного лабораторного контроля (список опубликован на сайте ведомства).
  Помимо этого Беларусь проведет расследование причин обнаружения нитратов в молочной продукции шести белорусских предприятий — об этом
  сообщалось на этой неделе. На время проведения проверки за продукцией этих предприятий будет усилен лабораторный контроль.
  Временные ограничения на поставку некоторых видов молока и молочной продукции из Беларуси Россельхознадзор ввел с 6 июня.
  Из республики продолжает поступать «небезопасная молочная продукция», поясняла необходимость введения ограничений
  официальный представитель ведомства Юлия Мелано. Больше всего нарушений было обнаружено в молоке и сливках, пастеризованных и
  стерилизованных наливом, молоке и сливках сухих, концентрированных, консервированных и сгущенных, сыворотках, концентрате
  сывороточного и молочного белка. Ограничения касались ввоза всей перечисленной продукции для переработки и в потребительской
  таре объемом свыше 2,5 л. Председатель правления «Союзмолока» Андрей Даниленко уверял, что эта мера не повлияет ни на российских
  переработчиков, ни на потребителей. Систематические претензии к качеству поставляемого из Беларуси молока и молочных продуктов у
  Россельхознадзора возникают уже давно. В начале года служба намеревалась ограничить ввоз отдельных видов белорусской
  молочной продукции из соседней страны. Но срок введения этой меры переносился, а в марте Россельхознадзор вовсе отказался
  от введения ограничений.
  Тогда Александр Лукашенко, комментируя возможное ограничение Россией поставок, заявил, что молоко «стало наглым политическим
  инструментом». Беларусь - крупнейший поставщик молока в Россию. По данным Россельхознадзора, в 2017 году Беларусь завезла
  в Россию 950,5 тыс. т молочной продукции, на ее долю пришлось 86% от всего российского импорта.
  `;

  readonly breadcrumbs: IBreadcrumb[] = [
    {
      title: 'Home',
      url: ''
    },
    {
      title: 'Overview',
      url: ''
    }
  ];

  readonly items$ = new BehaviorSubject<ICourse[]>([]);

  readonly searchSegment$ = new BehaviorSubject('');

  readonly viewItems$ = combineLatest(this.items$, this.searchSegment$)
    .pipe(
      map(([items, segment]) => [items, segment.trim().toLowerCase()] as [ICourse[], string]),
      map(([items, segment]) => items.filter((x) => this.filterItem(segment, x)))
    );

  readonly dataAvailable$ = this.viewItems$.pipe(map((x) => !!x.length));

  constructor(private readonly durationPipe: DurationPipe, private readonly dtPipe: DatePipe) {
  }

  ngOnInit(): void {
    this.items$.next(
      Array.from(Array(100).keys()).map((x) => {
        const c = new Course();
        c.id = x;
        c.title = x.toString();
        c.durationMin = Math.floor(Math.random() * (100 - 1)) + 1;
        c.description = OverviewPageComponent.itemLoremDesc;
        c.topRated = Math.random() < 0.5;
        c.creationDate = new Date(
          this.getRandomInt(0, 3000),
          this.getRandomInt(0, 11),
          this.getRandomInt(1, 30)
        );
        return c;
      })
    );
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
    this.searchSegment$.unsubscribe();
  }

  onDeleteCourse(courceToDelete: ICourse) {
    const actualCourses = this.items$.getValue().filter((x) => x !== courceToDelete);
    this.items$.next(actualCourses);

    console.log(`Course has been deleted: ${JSON.stringify(courceToDelete)}`);
  }

  onLoadMore() {
    console.log('load more click');
  }

  onSearch(segment: string) {
    this.searchSegment$.next(segment);
  }

  private filterItem(segment: string, item: ICourse) {
    if (segment === '') {
      return true;
    }

    if (item.title.toLowerCase().trim().indexOf(segment) !== -1) {
      return true;
    }

    if (item.description.toLowerCase().trim().indexOf(segment) !== -1) {
      return true;
    }

    if (item.id.toString() === segment) {
      return true;
    }

    if (this.durationPipe.transform(item.durationMin).toString().toLowerCase().trim().indexOf(segment) !== -1) {
      return true;
    }

    if (this.dtPipe.transform(item.creationDate).toString().toLowerCase().trim().indexOf(segment) !== -1) {
      return true;
    }

    return false;
  }
}
