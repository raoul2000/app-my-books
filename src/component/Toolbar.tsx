import React from "react";

type Props = {
    onAddBook: () => void
}
export const Toolbar: React.FC<Props> = ({onAddBook}): JSX.Element => {
    return (
        <div className="toolbar">
            <button onClick={() => onAddBook()}>add book</button>
        </div>
    )
};
