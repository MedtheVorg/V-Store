export type Billboard = {
    _id: string;
    label: string;
    imageUrl: string;
};
export type Category = {
    _id: string;
    name: string;
    billboardId: Billboard;
};

export type Product = {
    _id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
};

export type Image = {
    _id: string;
    url: string;
};

export type Size = {
    _id: string;
    name: string;
    value: string;
};

export type Color = {
    _id: string;
    name: string;
    value: string;
};
