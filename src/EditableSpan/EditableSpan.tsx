import React, {ChangeEvent, useState} from 'react';
import TextField from "@material-ui/core/TextField/TextField";

type EditableSpanPropsType = {
    value: string
    updateValue: (value: string) => void
};

export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        value,
        updateValue
    }
) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const editModeOn = () => {
        setEditMode(true);
    };
    const editModeOff = () => {
        setEditMode(false);

        const prepareString = (string: string) => string.replace(/\s+/g, ' ').trim();

        if (prepareString(title)) {
            updateValue(prepareString(title));
        }
    };

    const [title, setTitle] = useState<string>(value);
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    return (
        editMode
            ? <TextField
                autoFocus
                type="text"
                size="small"
                value={title}
                onChange={inputChangeHandler}
                onBlur={editModeOff}
                variant="outlined" />

            : <span
                onDoubleClick={editModeOn}>
                {value}
              </span>
    );
};
