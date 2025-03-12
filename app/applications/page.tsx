'use client';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { ChangeEvent, useEffect, useState } from 'react';
import { createClubApplication } from '@/src/actions/actions';

const ApplicationPage = ({ }) => {

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [val, setVal] = useState([])
  const [categoryFields, setCategoryFields] = useState([{ value: "" }])
  const [inputCategoryNum, setCategoryFieldNum] = useState()
  const [eventFields, setEventFields] = useState([{
    eventDay: "",
    eventTime: "",
    eventDescription: "",
    eventLocation: "",
  }])
  const [inputEventNum, setEventFieldNum] = useState()

  const inputEventHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;

    setEventFields((prev) => {
      const updatedFields = [...prev];
      updatedFields[index] = { ...updatedFields[index], [name]: value };
      return updatedFields;
    });
  };



  const addEventField = () => {
    if (eventFields.length < 10) {

      setEventFields([...eventFields, {
        eventDay: "",
        eventTime: "",
        eventDescription: "",
        eventLocation: "",
      }])
      console.log("Value being removed:", eventFields);
    } else {
      return
    }
  }

  const removeEventField = (index: number) => {
    if (eventFields.length > 1) {
      setEventFields(eventFields.filter((_, i) => i !== index));
    }
  };


  const inputCategoryHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const values = [...categoryFields]
    values[index].value = e.target.value
    setCategoryFields(values)
  }

  const addCategoryField = () => {
    if (categoryFields.length < 10) {
      setCategoryFields([...categoryFields, { value: "" }])
    } else {
      return
    }
  }

  const removeInputField = (index: number) => {
    if (categoryFields.length > 1) {
      setCategoryFields(categoryFields.filter((_, i) => i !== index));
    }
  };
  
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  useEffect(() => {
    return setCategoryFieldNum(categoryFields.length);
  }, [categoryFields]);

  useEffect(() => {
    setEventFieldNum(eventFields.length);
  }, [eventFields]);
  /* eslint-enable @typescript-eslint/ban-ts-comment */

  const change = async (e: { target: { value: any; }; }) => {
    const newValue = e.target.value
    try {
      const res = await fetch(`/api/searchNames?query=${encodeURIComponent(newValue)}`)
      const data = await res.json()
      setVal(data)
    } catch (error) {
      console.error("Error fetching search results:", error)
    }

  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <form action={createClubApplication}>
          <div className="mb-3">
            <label htmlFor="clubName" className="form-label">Club name</label>
            <input type="text" maxLength={32} className="form-control" name="clubName" required placeholder='Club name'></input>
            <div id="clubNameInfo" className="form-text">Maximum of 32 characters.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="clubModerator" className="form-label">Club moderator</label>
            <div className="row">
              <div className="col-6">
                <input type="text" className="form-control" placeholder='Moderator search' onChange={change}></input>
                <div id="suggestion-container"></div>
              </div>
              <div className="col-6">
                <select className="form-select" id="clubModerator" name="clubModerator" required>
                  {val.map((leader, index) => (
                    /* eslint-disable @typescript-eslint/ban-ts-comment */
                    <option key={index} value={leader.id}>
                      {leader.firstName} {leader.lastName}
                    </option>
                    /* eslint-enable @typescript-eslint/ban-ts-comment */
                  ))}
                </select>
              </div>
            </div>
            <div id="moderatorHelp" className="form-text">Moderator is selected on the left.</div>
            <div className="mb-3">
              <label htmlFor="clubCategory" className="form-label">Club category</label>
              <div id="moderatorHelp" className="form-text max-clubs mb-2">Category/s ({inputCategoryNum}/10)</div>
              <div className="category-container">

                {categoryFields.map((categoryField, index) => (
                  <div className='input-group mb-3' key={index}>
                    <input type='text' className='form-control' name='clubCategories' required value={categoryFields[index].value} onChange={(e) => inputCategoryHandler(e, index)}></input>
                    <div className='input-group-append'>
                      <button type='button' onClick={() => removeInputField(index)} className='btn btn-danger w-100'>
                        <i className='fas fa-times'>Delete</i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-primary" onClick={addCategoryField}>Add Category</button>
            </div>

            <div className="mb-3">
              <label htmlFor="clubEvents" className="form-label">Club events</label>
              <div id="moderatorHelp" className="form-text max-events mb-2">Events ({inputEventNum}/10)</div>
              <div className="events-container">

                {eventFields.map((eventField, index) => (

                  <div key={index} className='row g-1 mt-3'>
                    <div className='input-group col-md-6'>
                      <select className='form-control' name='eventDay' onChange={(e) => inputEventHandler(e, index)} value={eventField.eventDay} required>
                        {daysOfWeek.map((day,index) => (
                          <option key={index} value={day}>{day}</option>
                        ))}
                      </select>
                      <input type='time' className='form-control' name='eventTime' placeholder='Time' required value={eventField.eventTime} onChange={(e) => inputEventHandler(e, index)}></input>
                    </div>
                    <div className='input-group col-md-6'>
                      <input type='text' className='form-control' name='eventDescription' placeholder='Description' value={eventField.eventDescription} onChange={(e) => inputEventHandler(e, index)}></input>
                    </div>
                    <div className='input-group col-md-6'>
                      <input type='text' className='form-control' name='eventLocation' placeholder='Location' required value={eventField.eventLocation} onChange={(e) => inputEventHandler(e, index)}></input>
                      <div className='input-group-append'>
                        <button type='button' className='btn btn-danger' onClick={() => removeEventField(index)}>
                          <i className='fas fa-times'>Delete</i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-primary mt-3" onClick={addEventField}>Add Event</button>
            </div>
            <div className="form-group">
              <label htmlFor="clubDescription">Club description</label>
              <textarea className="form-control" id="clubDescription" name="clubDescription" rows={3} required></textarea>
            </div>
              <input type="hidden" name="action" value="create"></input>
              <button type="submit" className="btn btn-success mb-5 mt-3">Save</button>
          </div>
        </form>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ApplicationPage
