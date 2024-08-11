export const fetchFile = async (link: string) => {
    try {
      const response = await fetch(link);
      const text = await response.text();
      return text;
    } catch (error) {
        console.error('Error fetching the file:', error);
    }
};

export interface Item {
    id: string;
    name: string;
    isFolder: boolean;
    link?: string;
    type?: string;
    url?: string;
    items?: Item[];
    content?: string;
}