export type API_Book = {
    /**
     * the book internal id.
     *
     * ex: `c2d16107-79dc-4c54-8b6c-ebcf36a13582`
     */
    id: string;
    /**
     * The book title
     *
     * ex: "Alice in Wonderland"
     */
    title: string;
    /**
     *
     */
    subtitle?: string;
    /**
     * The book's Author
     *
     * ex: "Bob Marley"
     */
    author?: string;
    /**
     * ISBN number for this book
     *
     * ex: 9782330064426
     */
    isbn?: string;
    /**
     * Flag to set this book as traveling or not
     */
    is_traveling: number;
    /**
     * Counter for the number of time this traveling
     * book has been pinged
     */
    ping_count: number;
    /**
     * Book record creation date as unix timestamp
     *
     * ex: 1631097835
     */
    created_at: number;
    /**
     * Book record last update date as unix timestamp
     *
     * ex: 1631097835
     */
    updated_at: number;
};

/**
 * endpoints:
 * - read ticket `GET api/ticket`
 * - create ticket `POST api/ticket/create`
 */
export type API_Ticket = {
    /**
     * Ticket identifier, also called booking number
     *
     * ex: `ZER-4T2`
     */
    id: string;
    /**
     * ID of the book this ticket belongs to
     *
     * ex: `c2d16107-79dc-4c54-8b6c-ebcf36a13582`
     */
    book_id: string;
    /**
     * Ticket record creation date as unix timestamp
     *
     * ex: 1631097835
     */
    created_at: number;
    /**
     * Ticket record last update date as unix timestamp
     *
     * ex: 1631097835
     */
    updated_at: number;
    /**
     * URL of the QR Code's image (png) of this ticket
     *
     * ex: http://localhost:8080/files/qr-codes/CJ6-BNM.png`
     */
    qrcode_url: string;
    /**
     * Departure DateTime as UTC ISO 8610 string
     * 
     * ex: "2021-09-09T17:04:36+0000"
     */
    departure_at: string;
    /**
     * Location where the book departs from
     * 
     * ex: "Paris"
     */
    from: string;
};
/**
 * endpoints:
 * - get book list `GET api/user-book & expand=book`
 * - create book  `POST api/user-book/create & expand=book`
 * - update book  `PUT api/user-book/update & expand=book`
 *
 */
export type API_UserBook = {
    /**
     * ID of the related book
     *
     * ex: `c2d16107-79dc-4c54-8b6c-ebcf36a13582`
     */
    book_id: string;
    /**
     * Read status of the related book. Could be :
     * - 1 = To read
     * - 2 = Read
     * - 3 = Reading
     */
    read_status?: number;
    /**
     * Rating given by the user to the book.
     */
    rate?: number;
    /**
     * UserBook record creation date as unix timestamp
     *
     * ex: 1631097835
     */
    created_at: number;
    /**
     * UserBook record last update date as unix timestamp
     *
     * ex: 1631097835
     */
    updated_at: number;
    /**
     * The related book
     */
    book: API_Book;
};

/**
 * endpoints:
 * - boarding `POST api/ticket/boarding`
 */
export type API_Boarding = {
    book: API_Book;
    ticket: API_Ticket;
};

export type API_Track = {
    /**
     * Unique Track identifier
     */
    id: number;
    /**
     * ID of the related book
     *
     * ex: `c2d16107-79dc-4c54-8b6c-ebcf36a13582`
     */
    book_id: string;
    /**
     * IP address of the track creator
     */
    user_ip: string;
    /**
     * Email of the track creator
     *
     * Empty string if not set
     */
    email: string | null;
    /**
     * Comment about the book by the track creator
     *
     * Empty string if not set
     */
    text: string | null;
    /**
     * Rating assigned by the track creator
     *
     * Null if not set other number represented as a string
     */
    rate: number | null;
    /**
     * Location the track was created for
     *
     * Empty string if not set
     */
    location_name: string | null;
    /**
     * UserBook record creation date as unix timestamp
     *
     * ex: 1631097835
     */
    created_at: number;
    /**
     * UserBook record last update date as unix timestamp
     *
     * ex: 1631097835
     */
    updated_at: number;
};
/**
 * endpoints:
 * - read track list `GET api/tracker`
 */
export type API_BookTrack = {
    book: API_Book;
    track: API_Track[];
};

/**
 * endpoints:
 * - search book by ISBN `GET api/isbn-service/search`
 */
export type API_ISBN_SearchResult = {
    author: string;
    title: string;
}
