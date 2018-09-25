import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, delay } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Author {
  id: number;
  name: string;
}

@Component({
  selector: 'app-remote-authors',
  templateUrl: './remote-authors.component.html',
  styleUrls: ['./remote-authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RemoteAuthorsComponent),
      multi: true
    }
  ]
})
export class RemoteAuthorsComponent implements ControlValueAccessor {
  settedAuthors?: Author[] = [];
  authorsFound: Author[] = [];

  requestId = 0;

  request = false;

  private searchLine = '';

  onChange: (value: Author[]) => {};
  onTouched = () => {};

  constructor(@Inject('remoteHost') private readonly remoteHost: string,
              private readonly http: HttpClient) {
  }

  search(segment: string) {
    this.searchLine = segment;
    if (segment === '') {
      this.authorsFound = [];
      this.requestId++;
      this.request = false;
      return;
    }

    this.request = true;

    const rNumber = ++this.requestId;

    const url = `${this.remoteHost}/authors`;
    this.http.get<Author[]>(url)
    .pipe(
      delay(200),
      filter(() => rNumber === this.requestId),
      map((x) => x.filter((z) => z.name.indexOf(segment) !== -1)),
      map((x) => x.filter((z) => !this.settedAuthors || !this.settedAuthors.some((y) => y.id === z.id)))
    )
    .subscribe((x) => {
      this.authorsFound = x;
      this.request = false;
    });
  }

  choseAuthor(a: Author) {
    this.authorsFound = this.authorsFound.filter((x) => x !== a);

    const newAuthors = (this.settedAuthors || []).slice();
    newAuthors.push(a);
    this.writeValue(newAuthors);
  }

  remove(x: Author) {
    this.search(this.searchLine);
    const newSetted = this.settedAuthors.filter((z) => x.id !== z.id);

    if (!newSetted.length) {
      this.writeValue(undefined);
    } else {
      this.writeValue(newSetted);
    }
  }

  writeValue(obj: any): void {
    this.settedAuthors = !Array.isArray(obj) ? undefined : obj;
    if (this.onChange) {
      this.onChange(this.settedAuthors);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
