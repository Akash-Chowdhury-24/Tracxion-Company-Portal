import { useContext, useEffect, useState } from 'react';
import './edit-company.css';
import { globalContext } from '../../../context/context';
import { useNavigate, useParams } from 'react-router-dom';
import CommonFileUpload from '../../../Component/common-file-upload';
import CommonInput from '../../../Component/common-input';
import CommonLoader from '../../../Component/common-loader';

function EditCompany() {

  const { setBreadcrumbs, setPageTitle, setButtonList, setSubPageTitle } = useContext(globalContext);
  const navigate = useNavigate();
  const params = useParams();
  const companyId = params.id;
  const [loading, setLoading] = useState(false);
  const [companyDetailsFormData, setCompanyDetailsFormData] = useState({
    companyName: 'Company 1',
    companyLogo: 'https://via.placeholder.com/150',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
  });

  const [companyDetailsErrors, setCompanyDetailsErrors] = useState({
    companyName: false,
    companyLogo: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    addressLine1: false,
    city: false,
    state: false,
    zipCode: false,
  });

  const fetchCompanyDetails = async (companyId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/companies/${companyId}`);
      const data = await response.json();
      if (data.status === 200) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error in fetchCompanyDetails", error);
    }
  }

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Companies', link: '/companies' },
      { title: `${companyDetailsFormData.companyName}`, link: `/companies/edit-company/${companyId}` },
    ]);
    setPageTitle(`${companyDetailsFormData.companyName}`);
    setButtonList([
      {
        type: 'button',
        text: 'Cancel',
        onClick: () => { navigate('/companies') },
        backgroundColor: 'transparent',
        textColor: '#2C2D33',
        borderColor: 'transparent'
      },
      {
        type: 'button',
        text: 'Save',
        onClick: () => { console.log('Save') },
        backgroundColor: '#00A1F9',
        textColor: 'white',
        borderColor: '#00A1F9'
      },
    ]);
    setSubPageTitle({});

    // const fetchData = async () => {
    //  setLoading(true);
    //   const data = await fetchCompanyDetails(companyId);
    //   if(data){
    //     setCompanyData(data);
    //     setLoading(false);
    //   }
    // }
    // fetchData();
  }, [companyId]);

  const handleCompanyDetailsFormDataChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetailsFormData({ ...companyDetailsFormData, [name]: value });
    setCompanyDetailsErrors({ ...companyDetailsErrors, [name]: value.trim() === '' });
  };

  if (loading) {
    return <CommonLoader text="Loading company details..." />
  }

  return (
    <div>
      <div className='edit-company-title-container'>
        <h2>Company Details</h2>
      </div>
      <CommonInput
        label='Company Name'
        name='companyName'
        type='text'
        value={companyDetailsFormData.companyName}
        onChange={handleCompanyDetailsFormDataChange}
        error={companyDetailsErrors.companyName}
        placeholder='Enter Company Name'
        required={true}
        errorMsg='Company Name is required'
      />

      <div className='edit-company-title-container'>
        <h2>Company Logo</h2>
      </div>
      <CommonFileUpload
        onFilesChange={(files) => {
          console.log(files);
          setCompanyDetailsFormData({
            ...companyDetailsFormData,
            companyLogo: files
          })
        }}
        multiple={false}
        maxFiles={1}
        acceptedTypes="image"
        maxFileSize={200 * 1024}
        placeholder='Max 200KB file are allowed | Dimension 200*200'
        browseText='Browse File'
        // supportText='Only support .png and .jpg files'
        value={companyDetailsFormData.companyLogo}
      />

      <div className='edit-company-title-container'>
        <h2>Owner Details</h2>
      </div>
      <div className='edit-company-input-container1'>
        <CommonInput
          label='First Name'
          name='firstName'
          type='text'
          value={companyDetailsFormData.firstName}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.firstName}
          placeholder='Enter First Name'
          required={true}
          errorMsg='First Name is required'
          half={true}
          className="edit-company-input-extra-css"
        />
        <CommonInput
          label='Last Name'
          name='lastName'
          type='text'
          value={companyDetailsFormData.lastName}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.lastName}
          placeholder='Enter Last Name'
          required={true}
          errorMsg='Last Name is required'
          half={true}
          className="edit-company-input-extra-css"
        />
        <CommonInput
          label='Email'
          name='email'
          type='email'
          value={companyDetailsFormData.email}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.email}
          placeholder='Enter Email'
          required={true}
          errorMsg='Email is required'
          half={true}
          className="edit-company-input-extra-css"
        />
        <CommonInput
          label='Phone'
          name='phone'
          type='phone'
          value={companyDetailsFormData.phone}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.phone}
          placeholder='Enter Phone'
          required={true}
          errorMsg='Phone is required'
          half={true}
          className="edit-company-input-extra-css"
        />
        <CommonInput
          label='Address Line 1'
          name='addressLine1'
          type='text'
          value={companyDetailsFormData.addressLine1}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.addressLine1}
          placeholder='Enter Address Line 1'
          required={true}
          errorMsg='Address Line 1 is required'
          half={true}
          className="edit-company-input-extra-css"
        />
        <CommonInput
          label='Address Line 2'
          name='addressLine2'
          type='text'
          value={companyDetailsFormData.addressLine2}
          onChange={handleCompanyDetailsFormDataChange}
          placeholder='Enter Address Line 2'
          half={true}
          className="edit-company-input-extra-css"
        />
      </div>
      <div className='edit-company-input-container2'>
        <CommonInput
          label='City'
          name='city'
          type='text'
          value={companyDetailsFormData.city}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.city}
          placeholder='Enter City'
          required={true}
          errorMsg='City is required'
          half={true}
          className="edit-company-input-extra-css2"
        />
        <CommonInput
          label='State'
          name='state'
          type='text'
          value={companyDetailsFormData.state}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.state}
          placeholder='Enter State'
          required={true}
          errorMsg='State is required'
          half={true}
          className="edit-company-input-extra-css2"
        />
        <CommonInput
          label='Zip Code'
          name='zipCode'
          type='text'
          value={companyDetailsFormData.zipCode}
          onChange={handleCompanyDetailsFormDataChange}
          error={companyDetailsErrors.zipCode}
          placeholder='Enter Zip Code'
          required={true}
          errorMsg='Zip Code is required'
          half={true}
          className="edit-company-input-extra-css2"
        />
      </div>
    </div>
  );
}

export default EditCompany;