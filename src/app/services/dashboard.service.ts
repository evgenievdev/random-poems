import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poem } from '@models/poem.model';
import { BehaviorSubject, Observable } from 'rxjs';

// Use this service as a demo hub for local state management
// Implement local storage via ngrx/akita/etc and use query function bridge here

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _poems: Poem[] = [];
  private _selectedPoem: Poem | undefined;

  private _poems$ = new BehaviorSubject<Poem[]>(this._poems);
  private _selectedPoem$ = new BehaviorSubject<Poem | undefined>(undefined);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _loadingStep$ = new BehaviorSubject<string | undefined>(undefined);
  private _selectedPoemId$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(private http: HttpClient) {}

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get loadingStep$(): Observable<string | undefined> {
    return this._loadingStep$.asObservable();
  }

  get poems$(): Observable<Poem[]> {
    return this._poems$.asObservable();
  }

  get poems(): Poem[] {
    return this._poems;
  }

  get selectedPoemId$(): Observable<number | undefined> {
    return this._selectedPoemId$;
  }

  get selectedPoem(): Poem | undefined {
    return this._selectedPoem;
  }

  get selectedPoem$(): Observable<Poem | undefined> {
    return this._selectedPoem$.asObservable();
  }

  set selectedPoem(poem: Poem | undefined) {
    this._selectedPoem = poem;
    this._selectedPoemId$.next(poem !== undefined ? poem.id : undefined);
    this._selectedPoem$.next(this._selectedPoem);
  }

  set poems(poems: Poem[]) {
    this._poems = poems;
    this._poems$.next(poems);
  }

  async fetchPoemsForAuthor(author: string): Promise<void> {
    // Reset state first
    this.selectedPoem = undefined;
    this.poems = [];

    // Set loading indicator
    this._loading$.next(true);

    // Update loading state indicator and retrieve all poem titles for each author, then pick a few random titles
    this._loadingStep$.next('Picking poems from ' + author);
    const titles = await this.fetchTitlesForAuthor(author);
    const pickedTitles = pickRandomFromList(titles, 9);

    const poemsList = [];
    let idx = 0;

    for (const title of pickedTitles) {
      // For each picked title retrieve the entire poem
      const poemsFound: Poem[] = await this.fetchPoem(author, title.title);

      if (poemsFound && poemsFound.length > 0) {
        for (const poemFound of poemsFound) {
          poemsList.push({ id: idx, ...poemFound });
          idx++;
        }
      }
    }

    this.poems = poemsList;
    this._loading$.next(false);
  }

  async fetchRandomPoems(): Promise<void> {
    // Reset state first
    this.selectedPoem = undefined;
    this.poems = [];

    // Set loading indicator
    this._loading$.next(true);
    this._loadingStep$.next('Fetching poems and authors, please wait');
    const poemsList = [];

    // Retrieve all authors available and select a few random ones from the list
    const response: { authors: string[] } = await this.fetchAuthors();
    const pickedAuthors = pickRandomFromList(response.authors, 3);
    let idx = 0;

    for (const author of pickedAuthors) {
      // Update loading state indicator and retrieve all poem titles for each author, then pick a few random titles
      this._loadingStep$.next('Picking poems from ' + author);
      const titles = await this.fetchTitlesForAuthor(author);
      const pickedTitles = pickRandomFromList(titles, 3);

      for (const title of pickedTitles) {
        // For each picked title retrieve the entire poem
        const poemsFound: Poem[] = await this.fetchPoem(author, title.title);

        if (poemsFound && poemsFound.length > 0) {
          for (const poemFound of poemsFound) {
            poemsList.push({ id: idx, ...poemFound });
            idx++;
          }
        }
      }
    }

    this.poems = poemsList;

    this._loading$.next(false);
  }

  private async fetchAuthors(): Promise<{ authors: string[] }> {
    return this.http
      .get<{ authors: string[] }>('https://poetrydb.org/author')
      .toPromise();
  }

  private async fetchTitlesForAuthor(
    author: string
  ): Promise<{ title: string }[]> {
    return this.http
      .get<{ title: string }[]>(
        'https://poetrydb.org/author/' + author + '/title'
      )
      .toPromise();
  }

  private async fetchPoem(author: string, title: string): Promise<Poem[]> {
    return this.http
      .get<Poem[]>('https://poetrydb.org/author,title/' + author + ';' + title)
      .toPromise();
  }
}

export function shuffleFisherYates(from: number, to: number) {
  const arr: number[] = [];
  for (let n = from; n < to; n++) {
    arr.push(n);
  }
  let m = arr.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

export function pickRandomFromList<T>(list: T[], maxCount): T[] {
  const pickedIds = shuffleFisherYates(0, list.length).slice(
    0,
    maxCount > list.length ? list.length : maxCount
  );
  const result: T[] = [];
  for (const id of pickedIds) {
    result.push(list[id]);
  }
  return result;
}
