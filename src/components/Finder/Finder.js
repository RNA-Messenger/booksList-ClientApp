import React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

const Finder = ({ onInputChange, handleSubmit }) => {
  return (
    <Form
      inline
      onSubmit={(e) => handleSubmit(e)}
    >
      <InputGroup className="w-100">
        <FormControl
          type="text"
          placeholder="Find book ..."
          onChange={(e) =>
            onInputChange(e.target.value)
          }
        />
        <InputGroup.Prepend>
          <Button variant="secondary" type="submit" style={{padding: "0 25px"}}>
            Find
          </Button>
          <Button variant="warning" onClick={() => window.location.reload()}>Clear</Button>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
};

export default Finder;
