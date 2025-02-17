interface IShareLinkBase {
  title: string;
  link: string;
  due: string;
}

export type IShareLinkRequest = IShareLinkBase;
export type IShareLinkResponse = IShareLinkBase;
