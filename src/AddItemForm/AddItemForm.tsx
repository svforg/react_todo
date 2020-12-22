import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import {AddBox} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton/IconButton";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const prepareString = (string: string) => string.replace(/\s+/g, ' ').trim();

    const addItem = () => {
        if (prepareString(title) !== "") {
            props.addItem(title);
            setTitle("");
        }
        else {
            setError("Title is required");
        }
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const inputKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        e.key === "Enter" && addItem();
    };

    return (
        <div>

            <TextField
                size="small"
                value={title}
                onChange={inputChangeHandler}
                onKeyPress={inputKeyPressHandler}
                error={!!error}
                helperText={error}
                variant="outlined"/>

            <IconButton
                color="primary"
                onClick={addItem}>
                <AddBox/>
            </IconButton>

        </div>
    );
}


