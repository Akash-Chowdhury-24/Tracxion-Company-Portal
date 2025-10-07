import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../../context/context";
import CommonInput from "../../../Component/common-input";
import CommonTable from "../../../Component/common-table";
import { useNavigate } from "react-router-dom";
import CommonDeleteDialog from "../../../Component/common-delete-dialog";
import CommonLoader from "../../../Component/common-loader";

function AllCompanies() {
  const { setBreadcrumbs, setPageTitle, setButtonList, setSubPageTitle } = useContext(globalContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);

  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState([
    {
      id: 1,
      logo: '/avatar-2.svg',
      companyName: 'TechCorp Solutions',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@techcorp.com',
      phone: '1234567890',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 1',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    {
      id: 2,
      logo: '/avatar-2.svg',
      companyName: 'Global Industries',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@global.com',
      phone: '0987654321',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 1',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    {
      id: 3,
      logo: '/avatar-2.svg',
      companyName: 'Innovation Labs',
      firstName: 'Jim',
      lastName: 'Wilson',
      email: 'jim.wilson@innovation.com',
      phone: '5555555555',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 1',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    {
      id: 4,
      logo: '/avatar-2.svg',
      companyName: 'Digital Marketing Pro',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@digitalmarketing.com',
      phone: '1111111111',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 1',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    {
      id: 5,
      logo: '/avatar-2.svg',
      companyName: 'Cloud Services Inc',
      firstName: 'Mike',
      lastName: 'Brown',
      email: 'mike.brown@cloudservices.com',
      phone: '2222222222',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 1',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    }
  ]);
  const headers = [
    {
      title: 'Company Name',
      value: 'companyName'
    },
    {
      title: 'POC',
      value: 'poc'
    },
    {
      title: 'Email',
      value: 'email'
    },
    {
      title: 'Phone',
      value: 'phone'
    },
    {
      title: 'Action',
      value: 'action'
    }
  ];

  const [tableData, setTableData] = useState([]);


  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogTitle, setDeleteDialogTitle] = useState('');
  const [deleteDialogDescription, setDeleteDialogDescription] = useState('');
  const [deleteDialogHandleSubmit, setDeleteDialogHandleSubmit] = useState(() => { });

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/companies`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('tracxion admin token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      const data = await response.json();
      console.log("company data", data);
      if (data.status === 'success') {
        return data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log("error fetching company data", error);
    }
  }

  // Search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue.trim() === '') {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter(company =>
        company.companyName.toLowerCase().startsWith(searchValue.toLowerCase())
      );
      setFilteredCompanyData(filtered);
    }
  };

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Companies', link: '/companies' },
    ]);
    setPageTitle('All Companies');
    setButtonList([
      {
        type: 'button',
        text: 'Add New Company',
        onClick: () => { navigate('add-company') },
        backgroundColor: '#00A1F9',
        textColor: 'white',
        borderColor: '#00A1F9'
      },
      {
        type: 'search',
        name: 'search',
        value: searchTerm,
        onChange: handleSearch,
        inputType: 'text',
      }
    ]);
    setSubPageTitle({});
  }, [searchTerm, navigate]);

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Companies', link: '/companies' },
    ]);
    setPageTitle('All Companies');
    setButtonList([
      {
        type: 'button',
        text: 'Add New Company',
        onClick: () => { navigate('add-company') },
        backgroundColor: '#00A1F9',
        textColor: 'white',
        borderColor: '#00A1F9'
      },
      {
        type: 'search',
        name: 'search',
        value: searchTerm,
        onChange: handleSearch,
        inputType: 'text',
      }
    ]);
    setSubPageTitle({});
    // const fetchingData = async () => {
    //   setLoading(true);
    //   const data = await fetchCompanyData();
    //   setCompanyData(data);
    //   setLoading(false);
    // }
    // fetchingData();
  }, []);

  // Initialize filtered data when component mounts
  useEffect(() => {
    setFilteredCompanyData(companyData);
  }, [companyData]);

  useEffect(() => {
    const dataToUse = searchTerm.trim() === '' ? companyData : filteredCompanyData;
    const tableData = dataToUse.map((item) => ({
      id: item.id,
      companyName: {
        image: item.logo,
        name: item.companyName,
        id: item.id
      },
      poc: item.firstName + ' ' + item.lastName,
      email: item.email,
      phone: item.phone
    }));
    setTableData(tableData);
  }, [companyData, filteredCompanyData, searchTerm]);


  const handleActionClick = (action, id) => {
    console.log("action", action);
    console.log("id", id);
    if (action === 'edit') {
      navigate(`/companies/edit-company/${id}`);
    } else if (action === 'delete') {
      const companyName = companyData.find(company => company.id === id).companyName;
      console.log("company name", companyName);
      setDeleteDialogOpen(true);
      setDeleteDialogTitle('Delete Company');
      setDeleteDialogDescription(`Are you sure you want to delete ${companyName}?`);
      setDeleteDialogHandleSubmit(() => () => handleDeleteCompany(id));
    } else if (action === 'view') {
      navigate(`/companies/view-company/${id}`);
    }
  }

  const handleDeleteCompany = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/companies/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('tracxion admin token')}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      const data = await response.json();
      console.log("company deleted", data);
      if (data.status === 'success') {
        setDeleteDialogOpen(false);
        setCompanyData(prevData => prevData.filter(company => company.id !== id));
      }
    }
    catch (error) {
      console.log("error deleting company", error);
    }
  }

  if (loading) {
    return <CommonLoader text="Loading companies..." />
  }

  return (
    <div>
      <CommonTable
        tableData={tableData}
        headers={headers}
        handleActionClick={handleActionClick}
        specificReturn="id"
      />

      <CommonDeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title={deleteDialogTitle}
        description={deleteDialogDescription}
        handleSubmit={deleteDialogHandleSubmit}
      />
    </div>
  );
}

export default AllCompanies;