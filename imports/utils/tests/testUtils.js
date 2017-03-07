// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import cheerio from "cheerio";
import _ from "lodash";
import { mount } from "enzyme";

export const formattedJSON = (item: mixed): string => JSON.stringify(item, null, 2);

type IStatusObj = {
  className: string,
  status: string,
};

export const notFoundStatus = (className: string): IStatusObj => (
  { className, status: "not found" }
);

export const htmlClassList = (htmlString: string): string[] => {
  const $ = cheerio.load(htmlString);
  let classList = [];

  $("*").each(function () {
    const elemClasses = $(this).attr("class"); // attr returns undefined when not found
    if (elemClasses) {
      classList = _.union(classList, _.compact(elemClasses.split(" ")));
    }   // compact removes any empty strings caused by extra spaces around multiple classNames
  });

  return classList;
};

export const componentClassNameList = (currComponent: React$Element<*>): string[] => {
  const mountedHTML = mount(currComponent).html(); // might be able to use shallow here
  return htmlClassList(mountedHTML);
};

type IStyleObj = {
  rules: Object,      // eslint-disable-line flowtype/no-weak-types
  className: string,
};

type IStylesObj = {
  [id: string]: IStyleObj,
};

export const getStyleObject =
  (className: string, stylesObj: IStylesObj): IStyleObj | IStatusObj => {
    // eslint-disable-next-line flowtype/require-parameter-type, flowtype/require-return-type
    const styleKey: string | void = _.findKey(stylesObj, obj => (obj.className === className));

    return styleKey ? stylesObj[styleKey] : notFoundStatus(className);
  };

type IStyleObjectList = Array<IStyleObj | IStatusObj>;

export const getStyleObjectList =
  (classNameList: string[], styles: IStylesObj): IStyleObjectList => (
    // eslint-disable-next-line flowtype/require-parameter-type, flowtype/require-return-type
    classNameList.map(className => (getStyleObject(className, styles)))
  );

export const getAllComponentStyle =
  (currComponent: React$Element<*>, styles: IStylesObj): IStyleObjectList => {
    const classNameList = componentClassNameList(currComponent);
    return getStyleObjectList(classNameList, styles);
  };
