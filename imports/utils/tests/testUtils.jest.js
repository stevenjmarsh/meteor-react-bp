// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import {
  formattedJSON,
  htmlClassList,
  componentClassNameList,
  getStyleObject,
  getStyleObjectList,
  notFoundStatus,
  getAllComponentStyle,
} from "./testUtils";

describe("testUtils", function () {
  describe("formattedJSON", function () {
    it("formats JSON stringify, multi-line indented with 2 spaces", function () {
      const smallArray = ["abc", "def", 123];
      expect(formattedJSON(smallArray)).toBe(`[\n  "abc",\n  "def",\n  123\n]`);
    });
  });

  describe("notFoundStatus", function () {
    it("creates a new object with a className and status property of 'not found'", function () {
      expect(notFoundStatus("thisClass")).toEqual({
        className: "thisClass",
        status: "not found",
      });
    });
  });

  describe("htmlClassList", function () {
    it("returns an array of class names when provided an html string with classes", function () {
      const htmlString = `<div class="c1"><div>some text</div><div>Coming Soon</div></div>`;
      expect(htmlClassList(htmlString).length).toEqual(1);
    });

    it("returns an empty array if provided an empty html string", function () {
      expect(htmlClassList("").length).toEqual(0);
    });

    it("returns an empty array if no classes are found", function () {
      const htmlString = `<div><h1 id="main">some text</h1><h2>Coming Soon</h2><div></div></div>`;
      expect(htmlClassList(htmlString).length).toEqual(0);
    });

    it("finds deep nested classes", function () {
      const htmlString =
        `<div id="main">` +
        `<h1>some text here</h1>` +
        `<div>` +
        `<ul class="c1">` +
        `<li class="c2">item 1</li>` +
        `<ul>` +
        `<div>` +
        `<div></div>` +
        `</div>`;

      expect(htmlClassList(htmlString)).toEqual(["c1", "c2"]);
    });

    it("finds multiple unique classes per single element", function () {
      const htmlString = `<div id="main"><h1 class="c1 c2">some text</h1></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1", "c2"]);
    });

    it("finds multiple unique classes per single element, even with extra spaces", function () {
      let htmlString = `<div id="main"><h1 class="c1 c2 ">some text</h1></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1", "c2"]);

      htmlString = `<div id="main"><h1 class=" c1 c2">some text</h1></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1", "c2"]);

      htmlString = `<div id="main"><h1 class=" c1 c2 ">some text</h1></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1", "c2"]);

      htmlString = `<div id="main"><h1 class=" c1  c2 ">some text</h1></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1", "c2"]);
    });

    it("does not add duplicate classes", function () {
      let htmlString = `<div class="c1"><div class="c1">some text</div></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1"]);

      htmlString = `<div class="c1"><div class="c2 c1">some text</div></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1", "c2"]);

      htmlString =
        `<div class="c1">` +
        `<div class="c2 c3">some text here</div>` +
        `<div class="c1">Coming Soon</div>` +
        `<div class="c4 c3"></div>` +
        `</div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1", "c2", "c3", "c4"]);
    });

    it("does not add duplicate classes, even if listed in same element twice", function () {
      const htmlString = `<div><h1 class="c1 c1">some text</h1></div>`;
      expect(htmlClassList(htmlString)).toEqual(["c1"]);
    });
  });

  describe("componentClassNameList", function () {
    it("returns an array of unique class names of given a component", function () {
      const SimpleComponent = () => (
        <div className="c1">
          <h1 className="c2">Title</h1>
          <p className="c3 c1">text</p>
        </div>
      );

      expect(componentClassNameList(<SimpleComponent />)).toEqual(["c1", "c2", "c3"]);
    });

    it("includes class names from nested components", function () {
      const NestedComponent = () => (
        <div className="c1">
          <h1 className="c4">Title</h1>
          <p className="c5 c1">text</p>
        </div>
      );

      const ComplexComponent = () => (
        <div className="c1">
          <h1 className="c2">Title</h1>
          <p className="c3 c2">text</p>
          <NestedComponent />
        </div>
      );

      expect(componentClassNameList(<ComplexComponent />))
        .toEqual(["c1", "c2", "c3", "c4", "c5"]);
    });

    it("creates an empty array when no classNames are found", function () {
      const SimpleComponent = () => (
        <div>
          <h1>Title</h1>
          <p>text</p>
        </div>
      );

      expect(componentClassNameList(<SimpleComponent />).length).toEqual(0);
    });
  });

  describe("Capture Styling / CSS Rules", function () {
    // a sample styles object, matching local/project pattern with glamor styles
    const styles = {
      bigStyle: {
        rules: { fontSize: "22px" },
        className: "bigStyleHashName",
      },
      littleStyle: {
        rules: { fontSize: "16px" },
        className: "littleStyleHashName",
      },
    };

    describe("getStyleObject", function () {
      it("returns the found style object for a given className", function () {
        const foundStyleObj = getStyleObject("bigStyleHashName", styles);
        expect(foundStyleObj).toEqual(styles.bigStyle);
      });

      it("returns a 'not found status object' if className not found", function () {
        const foundStyleObj = getStyleObject("badClassName", styles);
        expect(foundStyleObj).toEqual(notFoundStatus("badClassName"));
      });
    });

    describe("getStyleObjectList", function () {
      it("creates an array of style objects", function () {
        const classNameList = ["bigStyleHashName", "littleStyleHashName"];
        const ruleObjectsList = getStyleObjectList(classNameList, styles);

        expect(Array.isArray((ruleObjectsList))).toBe(true);
        expect(typeof ruleObjectsList[0]).toBe("object");

        expect(ruleObjectsList[0]).toEqual(styles.bigStyle);
        expect(ruleObjectsList[1]).toEqual(styles.littleStyle);
      });

      it("creates an empty array when given empty class name list", function () {
        const ruleObjectsList = getStyleObjectList([], styles);

        expect(Array.isArray((ruleObjectsList))).toBe(true);
        expect(ruleObjectsList.length).toBe(0);
      });

      it("includes a 'not found' status if className not found", function () {
        const classNameList = ["bigStyleHashName", "badClassName"];
        const ruleObjectsList = getStyleObjectList(classNameList, styles);

        expect(ruleObjectsList[0]).toEqual(styles.bigStyle);
        expect(ruleObjectsList[1]).toEqual(notFoundStatus("badClassName"));
      });
    });

    describe("getAllComponentStyle", function () {
      it("returns an array of style objects for a given component", function () {
        const SimpleComponent = () => (
          <div>
            <h1 className="bigStyleHashName">Title</h1>
            <p className="littleStyleHashName">text</p>
          </div>
        );

        const styleArray = getAllComponentStyle(<SimpleComponent />, styles);
        expect(styleArray.length).toEqual(2);
        expect(Array.isArray((styleArray))).toBe(true);
        expect(typeof styleArray[0]).toBe("object");
        expect(styleArray[0]).toEqual(styles.bigStyle);
        expect(styleArray[1]).toEqual(styles.littleStyle);
      });

      it("returns an empty array when given component has no styles", function () {
        const SimpleComponent = () => (
          <div>
            <h1>Title</h1>
            <p>text</p>
          </div>
        );

        const styleArray = getAllComponentStyle(<SimpleComponent />, styles);
        expect(styleArray.length).toEqual(0);
        expect(Array.isArray((styleArray))).toBe(true);
      });
    });
  });
});
