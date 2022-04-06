import React, { useEffect, useState } from 'react'
import './Home.css';

function Home() {

    const [inputFields, setInputFields] = useState([
        { operator: '+', value: '', isEnable: true }
    ])

    const [finalSum, setFinalSum] = useState(0)

    useEffect(() => {
        console.log(inputFields);
        calculateSum()
    }, [inputFields])


    const addFields = () => {
        let newfield = { operator: '+', value: '', isEnable: true }
        setInputFields([...inputFields, newfield])
    }

    const removeFields = (e, index) => {
  
        e.preventDefault()
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)

    }

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index]['value'] = Number(event.target.value);
        setInputFields(data)
    }

    const handleSelectChange = (index, event) => {
        let data = [...inputFields];
        data[index]['operator'] = event.target.value;
        setInputFields(data)

    }

    const onClickDisable = (e, index) => {
        e.preventDefault()
        let data = [...inputFields];
        data[index]['isEnable'] = !data[index]['isEnable']
        setInputFields(data)
    }

    const calculateSum = () => {

        let finalSum = 0

        let data = [...inputFields];

        //Filter Disable Feilds
        let filterd_Data = data.filter(feild => feild.isEnable == true)


        //Add +
        let temp_count_1 = 0
        let dummy_data = filterd_Data.filter(feild => feild.operator == '+')

        dummy_data.forEach(e => {
            temp_count_1 = temp_count_1 + e.value
        })

        console.log(temp_count_1);


        //Add -
        let temp_count_2 = 0
        let dummy_data_2 = filterd_Data.filter(feild => feild.operator == '-')

        dummy_data_2.forEach(e => {
            temp_count_2 = temp_count_2 + e.value
        })

        //Calculate Final Sum

        finalSum = temp_count_1 - temp_count_2

        setFinalSum(finalSum)
    }

    return (
        <div className="p-4">

            <div className="text-xl font-bold">
                React Calculator
            </div>

            <div className='h-4'></div>

            <div>
                <button onClick={addFields} className='bg-black hover:bg-black text-white font-bold py-2 px-4 rounded'>
                    Add Row
                </button>
            </div>

            <div className='h-4'></div>

                <form>
                    {inputFields.map((input, index) => {
                        return (

                            <div className='flex justify-center mb-4' key={index}>
                                <select
                                    className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='name'
                                    placeholder='Name'
                                    value={input.operator}
                                    onChange={event => handleSelectChange(index, event)}
                                >
                                    <option value={'+'}>
                                        +
                                    </option>
                                    <option value={'-'}>
                                        -
                                    </option>
                                </select>

                                <div className='w-4'></div>

                                <input
                                    className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='value'
                                    placeholder='Value'
                                    type="number"
                                    value={input.value}
                                    onChange={event => handleFormChange(index, event)}
                                />

                                <div className='w-4'></div>

                                <button onClick={(e) => removeFields(e, index)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Delete
                                </button>

                                <div className='w-4'></div>

                                <button onClick={(e) => onClickDisable(e, index)} className={input.isEnable ? 'btnDisble' : 'btnEnable'}>
                                    {input.isEnable ? 'Disable' : 'Enable'}
                                </button>
                            </div>

                        )
                    })}
                </form>


            <div className='flex justify-center'>

                <div className='text-xl font-bold'>
                    Total
                </div>

                <div className='w-4'></div>

                <div className='text-xl font-bold'>
                    {finalSum}
                </div>

            </div>

        </div>
    )
}


export default Home;