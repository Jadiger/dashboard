export interface ISite {
  date: Date | null;
  visits: string;
  pageviews: string;
}
export interface ISiteAll {
  name: string;
  url: string;
  description: string;
  id: string;
  statistics: ISite[];
}
// export interface IStatistic : ISite[]