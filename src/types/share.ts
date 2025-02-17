interface IShareLinkBase {
  title: string;
  link: string;
  due: string;
}

export interface IShareLinkResponse extends IShareLinkBase {
  id: string;
}

export type IShareLinkRequest = IShareLinkBase;
