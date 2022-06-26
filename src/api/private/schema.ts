import Ajv, { JSONSchemaType } from "ajv";
import {
    API_Book,
    API_UserBook,
    API_ISBN_SearchResult,
    API_Ticket,
    API_Boarding,
    API_Track,
    API_BookTrack,
} from "./types";

const bookSchema: JSONSchemaType<API_Book> = {
    $id: "http://example.com/schemas/book.json",
    type: "object",
    properties: {
        id: { type: "string" },
        title: { type: "string" },
        subtitle: { type: "string", nullable: true },
        author: { type: "string", nullable: true },
        isbn: { type: "string", nullable: true },
        is_traveling: { type: "number", enum: [0, 1] },
        ping_count: { type: "number", minimum: 0 },
        created_at: { type: "number" },
        updated_at: { type: "number" },
    },
    required: [
        "id",
        "title",
        "is_traveling",
        "ping_count",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
};

const userBookSchema: JSONSchemaType<API_UserBook> = {
    $id: "http://example.com/schemas/user-book.json",
    type: "object",
    properties: {
        book_id: { type: "string" },
        read_status: { type: "number", nullable: true, enum: [1, 2, 3, 4] },
        read_at: { type: "string", nullable: true },
        rate: { type: "number", minimum: 0, nullable: true },
        created_at: { type: "number" },
        updated_at: { type: "number" },
        book: { $ref: "book.json" },
    },
    required: ["book_id", "created_at", "updated_at"],
    additionalProperties: false,
};

const userBookListSchema: JSONSchemaType<API_UserBook[]> = {
    $id: "http://example.com/schemas/user-book-list.json",
    type: "array",
    items: userBookSchema,
};

const isbnSearchResultSchema: JSONSchemaType<API_ISBN_SearchResult> = {
    $id: "http://example.com/schemas/isbn-search-result.json",
    type: "object",
    properties: {
        author: { type: "string" },
        title: { type: "string" },
        subtitle: { type: "string", nullable: true },
    },
    required: ["author", "title"],
    additionalProperties: false,
};

const ticketSchema: JSONSchemaType<API_Ticket> = {
    $id: "http://example.com/schemas/ticket.json",
    type: "object",
    properties: {
        id: { type: "string" },
        book_id: { type: "string" },
        qrcode_url: { type: "string" },
        checkpoint_url: { type: "string" },
        departure_at: { type: "string" },
        from: { type: "string" },
        created_at: { type: "number" },
        updated_at: { type: "number" },
    },
    required: [
        "id",
        "book_id",
        "created_at",
        "updated_at",
        "qrcode_url",
        "checkpoint_url",
        "departure_at",
    ],
    additionalProperties: false,
};

const boardingSchema: JSONSchemaType<API_Boarding> = {
    $id: "http://example.com/schemas/boarding.json",
    type: "object",
    properties: {
        book: { $ref: "book.json" },
        ticket: { $ref: "ticket.json" },
    },
    required: ["book", "ticket"],
    additionalProperties: false,
};

const trackSchema: JSONSchemaType<API_Track> = {
    $id: "http://example.com/schemas/track.json",
    type: "object",
    properties: {
        id: { type: "number" },
        book_id: { type: "string" },
        is_boarding: { type: "number", enum: [0, 1] },
        user_ip: { type: "string" },
        email: { type: "string", nullable: true },
        text: { type: "string", nullable: true },
        rate: { type: "number", nullable: true },
        location_name: { type: "string", nullable: true },
        created_at: { type: "number" },
        updated_at: { type: "number" },
    },
    required: [
        "id",
        "book_id",
        "user_ip",
        "email",
        "text",
        "location_name",
        "created_at",
        "updated_at",
    ],
    additionalProperties: false,
};

const trackListSchema: JSONSchemaType<API_Track[]> = {
    $id: "http://example.com/schemas/track-list.json",
    type: "array",
    items: trackSchema,
};

const bookTrackSchema: JSONSchemaType<API_BookTrack> = {
    $id: "http://example.com/schemas/book-track.json",
    type: "object",
    properties: {
        track: { $ref: "track-list.json" },
    },
    required: ["track"],
    additionalProperties: false,
};
//////////////////////////////////////////////////////////////////////////////////////////////////

const ajv = new Ajv({
    allErrors: false,
    verbose: true,
    schemas: [
        bookSchema,
        userBookSchema,
        userBookListSchema,
        ticketSchema,
        trackListSchema,
    ],
});

export const validateBookType = ajv.compile(bookSchema);
export const validateUserBookType = ajv.compile(userBookSchema);
export const validateUserBookListType = ajv.compile(userBookListSchema);
export const validateIsbnSearchResultType = ajv.compile(isbnSearchResultSchema);
export const validateTicketType = ajv.compile(ticketSchema);
export const validateBoardingType = ajv.compile(boardingSchema);
export const validateBookTrackType = ajv.compile(bookTrackSchema);
