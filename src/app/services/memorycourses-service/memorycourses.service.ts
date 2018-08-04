import { Injectable } from '@angular/core';

import { CoursesService } from '../../contracts';
import { ICourse, Course } from '../../models';
import { DurationPipe } from '../duration-pipe';
import { DatePipe } from '@angular/common';


@Injectable()
export class MemoryCoursesService extends CoursesService {

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

  private items: ICourse[] = [];

  constructor(private readonly durationPipe: DurationPipe, private readonly dtPipe: DatePipe) {
    super();

    this.items = Array.from(Array(100).keys())
    .map((x) => {
      const c = new Course();
      c.id = x;
      c.title = x.toString();
      c.durationMin = Math.floor(Math.random() * (100 - 1)) + 1;
      c.description = MemoryCoursesService.itemLoremDesc;
      c.topRated = Math.random() < 0.5;
      c.creationDate = new Date(
        this.getRandomInt(0, 3000),
        this.getRandomInt(0, 11),
        this.getRandomInt(1, 30)
      );
      return c;
  });
  }

  get() {
    return Promise.resolve(this.items);
  }

  async getById(id: number) {
    const items = await this.get();
    return items.find((item) => item.id === id);
  }

  async remove(id: number) {
    const itemRemove = await this.getById(id);
    if (itemRemove) {
      const itemsNew = (await this.get()).filter((x) => x.id !== id);
      this.items = itemsNew;
    }

    return itemRemove;
  }

  create(courseNew: ICourse) {
    courseNew.id = Date.now();

    const itemsNew = this.items.slice();
    itemsNew.push(courseNew);

    return Promise.resolve(courseNew);
  }

  update(updateProperties: ICourse) {
    const itemToUpdatePosition = this.items.findIndex((x) => x.id === updateProperties.id);
    if (itemToUpdatePosition === -1) {
      throw new Error(`Course with id: '${updateProperties.id}' not found.`);
    }

    const itemToUpdate = this.items[itemToUpdatePosition];

    // set properties to target course
    Object.keys(updateProperties)
    .map((property: keyof ICourse) => itemToUpdate[property] = updateProperties[property]);

    return Promise.resolve(itemToUpdate);
  }

  filter(segment: string) {
    const itemsFiltered = this.items
    .filter((item) => this.itemContainsSegment(segment, item));

    return Promise.resolve(itemsFiltered);
  }

  //#region internal

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private itemContainsSegment(segment: string, item: ICourse) {
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

  //#endregion internal
}
