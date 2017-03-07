// Hand creating react-toggle libdef
// props and types listed at https://github.com/aaronshaf/react-toggle
declare module "react-toggle" {
  declare type ReactToggleProps = {
    checked?: boolean,
    defaultChecked?: boolean,
    onChange?: Function,
    name?: string,
    id: string,
    disabled?: boolean,
  };

  declare export default class Toggle extends React$Component {
    props: ReactToggleProps;
  }
}
