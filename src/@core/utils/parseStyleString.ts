export const parseStyleString = (styleString: string): React.CSSProperties => {
    return styleString
      .split(";")
      .reduce((styleObj: { [key: string]: string }, styleRule) => {
        const [property, value] = styleRule.split(":").map((s) => s.trim());
        if (property && value) {
          // Allow any string as a property
          styleObj[property] = value;
        }
        return styleObj;
      }, {});
  };
  