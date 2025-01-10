export const ClientRemoveTags = (html: any) => {
    // Regular expression to match HTML tags
    const tagRegex = /<[^>]*>|&nbsp;/g;
  
    // Remove HTML tags using regex
    const textWithoutTags = html.replace(tagRegex, "");
  
    return textWithoutTags;
  };