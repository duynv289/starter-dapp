import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

function ContributeForm({ address }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);
    setLoading(true);
    setErrorMessage('');
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  const onViewRequestOnClick = () => {};

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label='ether'
          labelPosition='right'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Message header='Oops!' error content={errorMessage} />
        <Button
          style={{ marginTop: '10px' }}
          loading={loading}
          primary
          onClick={onViewRequestOnClick}
        >
          Contribute!
        </Button>
      </Form.Field>
    </Form>
  );
}

export default ContributeForm;
