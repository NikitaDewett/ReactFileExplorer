const data = {
    id: '1',
    name: 'Main',
    isFolder: true,
    items: [
        {
            id: '2',
            name: 'Subfolder_1',
            isFolder: true,
            items: [
                { id: '3', name: 'File_1.txt', isFolder: false, link: '/text1.txt', type: 'file' },
                {
                    id: '4',
                    name: 'Image.png',
                    isFolder: false,
                    type: 'image',
                    url: 'https://d3phaj0sisr2ct.cloudfront.net/site/images/tools/thumbnails/reviewed/upscale+image.png'
                },
                {
                    id: '5',
                    name: 'Image_2.jpeg',
                    isFolder: false,
                    type: 'image',
                    url: 'https://qph.cf2.quoracdn.net/main-qimg-34f51f055713ba60524f1b871b168d96'
                },
            ],
        },
        {
            id: '6',
            name: 'Subfolder_2',
            isFolder: true,
            items: [
                { id: '7', name: 'File_2.txt', isFolder: false, link: '/text2.txt', type: 'file' },
                { id: '8', name: 'File_3.txt', isFolder: false, link: '/text3.txt', type: 'file' },
            ],
        },
    ],
};

export default data;

