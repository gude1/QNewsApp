export type FetchNewsAttributes = {
  page: number;
  hitsPerPage: number;
};

type HighlightResult = {
  author: {
    matchLevel: string;
    matchedWords: string[];
    value: string;
  };
  title: {
    matchLevel: string;
    matchedWords: string[];
    value: string;
  };
  url: {
    matchLevel: string;
    matchedWords: string[];
    value: string;
  };
};

type Hit = {
  _highlightResult: HighlightResult;
  author: string;
  created_at: string;
  objectID: string;
  title: string;
  url: string;
};

export type FetchNewsResponse = {
  hits: Hit[];
};
