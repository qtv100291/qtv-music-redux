import React, { Component } from 'react';
import InputElementType1 from './inputElementType1';
import InputElementType2 from './inputElementType2';
import InputElementType3 from './inputElementType3';
import TextArea from './textArea';
import RadioInput from './radioInput';
import Select from './inputSelect';
import additionalFunctionDom from '../../ultis/additionalFunctionDom';

class Form extends Component {

    handleSubmit =  async e => {
        e.preventDefault();
        const errors = additionalFunctionDom.checkInput(this.inputCheck); // check and print errors (if any)
        await this.setState({ errors, serverError: "" })
        if (this.state.data.paymentMethod === "card"){
          const prevErrors = {...this.state.errors}
          const errors = additionalFunctionDom.checkInput(this.inputCheckForCardPayment);
          const newErros = {...prevErrors,...errors};
          this.setState({errors : newErros})
        }
        if (additionalFunctionDom.checkIfThereAreAnyError(errors)) return;
        this.doSubmit();
    }

    handleChange = ({currentTarget : input} ) => {
      // set state when changing input 
      let data = {...this.state.data};
      if (input.name === "cardExpireDate"){
        const testRegex_1 = /^\d{3}$/;
        const testRegex_2 = /^\d{2}[/]$/;
        const testRegex_3 = /^\d{2}[/]\d{5}$/;
        let inputModified;
        switch (true){
          case testRegex_1.test(input.value):
            inputModified = input.value;
            data[input.name] = inputModified.slice(0,2) + "/" + inputModified.slice(-1);
            break
          case testRegex_2.test(input.value):
            data[input.name] = input.value.replace(/\//g,"");
            break
          case testRegex_3.test(input.value):
            inputModified = input.value.substring(0, input.value.length - 1);
            data[input.name] = inputModified;
            break
          default :
            data[input.name] = input.value;
        }
      }
      else{
        data[input.name] = input.value;
      }
      this.setState({data});
      // check all inputs are filled
      if (additionalFunctionDom.checkAreAllInputFilled()) {
        this.setState({ disabled : false })
      }
      else this.setState({ disabled : true })
    }

    handleCardExpireDate = event => {
      if (event.currentTarget.name === "cardExpireDate") {
        const validKey = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,46]
        if (!validKey.includes(event.keyCode)){
        event.preventDefault()
       }
      }
    }

    handleOnlyDigit = ( digitNumber, input) => {
      //allow user to type only digit 
      const regexVariable= `^\\d{0,${digitNumber}}$`
      const testRegex = new RegExp (regexVariable,"g")
      if (testRegex.test(input.value)) {
        let data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data});
      }
      else {
        let inputModified = input.value.substring(0, input.value.length - 1);
        let data = {...this.state.data};
        data[input.name] = inputModified;
        this.setState({ data });
      }
    }

    handleChangeSelect = ({currentTarget : input}) => {
      // set state when changing input 
      let data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
      if (input.name === "receiverProvince" || input.name === "userProvince") {
        this.hanldeDistrict(input.value);
      }
      if (input.name === "receiverDistrict" || input.name === "userDistrict") {
        this.hanldeCommune(input.value);
      }
      
    }

    handleChangeRadio = ({currentTarget : input}) => {
      let data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
    }

    renderInputType1(name, placeHolder, width , label = "",type = "text") {
        const { data, errors } = this.state;
        return (
          <InputElementType1
            type={type}
            name={name}
            value={data[name]}
            width = {width}
            placeholder = {placeHolder}
            label={label}
            error = {errors[name]}
            onChange={this.handleChange}
          />
        );
    }
    renderInputType2(name , label = "",type = "text",isOnlyDigit = "false",digitNumber = 10) {
      const { data, errors } = this.state;
      if (isOnlyDigit === "true") 
      return (
        <InputElementType2
          type={type}
          name={name}
          value={data[name]}
          label={label}
          error = {errors[name]}
          onChange={e => this.handleOnlyDigit(digitNumber, e.currentTarget)}
        />
      )
      else return (
        <InputElementType2
          type={type}
          name={name}
          value={data[name]}
          label={label}
          error = {errors[name]}
          onChange={this.handleChange}
        />
      );
    }
    
    renderInputType3(name , label, placeholder, isOnlyDigit = "false",digitNumber = 10, obligatory = "true", type = "text") {
      const { data, errors } = this.state;
      if (isOnlyDigit === "true") 
      return (
        <InputElementType3
          type={type}
          name={name}
          value={data[name]}
          label={label}
          placeholder={placeholder}
          obligatory={obligatory}
          error = {errors[name]}
          onChange={e => this.handleOnlyDigit(digitNumber, e.currentTarget)}
        />
      )
      else return (
        <InputElementType3
          type={type}
          name={name}
          value={data[name]}
          label={label}
          placeholder={placeholder}
          obligatory={obligatory}
          error = {errors[name]}
          onChange={this.handleChange}
          onKeyDown = {this.handleCardExpireDate}
        />
      );
    }

    renderSelect(name, label, options, idName) {
      const { data, errors } = this.state;
      return (
        <Select
          name={name}
          value={data[name]}
          label={label}
          idName={idName}
          options={options}
          error = {errors[name]}
          onChange={this.handleChangeSelect}
          error={errors[name]}
        />
      );
    }

    renderTextArea(name, label, placeholder, rows) {
      const { data, errors } = this.state;
      return (
        <TextArea
          name={name}
          value={data[name]}
          label={label}
          rows={rows}
          placeholder={placeholder}
          error = {errors[name]}
          onChange={this.handleChange}
        />
      );
    }

    renderTextArea(name, label, placeholder, rows) {
      const { data, errors } = this.state;
      return (
        <TextArea
          name={name}
          value={data[name]}
          label={label}
          rows={rows}
          placeholder={placeholder}
          error = {errors[name]}
          onChange={this.handleChange}
        />
      );
    }

    renderRadioInput(name, id, label, value, autoselect = "false") {
      const { errors } = this.state;
      if (autoselect === "true") {
        return (
          <RadioInput
            name={name}
            value={value}
            label={label}
            id={id}
            defaultChecked={true}
            error = {errors[name]}
            onChange = {this.handleChangeRadio}
          />);
      }
      else 
        return (
            <RadioInput
              name={name}
              value={value}
              label={label}
              id={id}
              error = {errors[name]}
              onChange = {this.handleChangeRadio}
            />);  
        }
}
 
export default Form;