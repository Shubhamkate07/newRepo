
import bgimage from "./img.svg";
import Male from './Male.svg';
import Female from './Female.svg';
import PersonIcon from '@mui/icons-material/Person';
import Email from './Email.svg';
import Contact from './Contact.svg';
import Intrested from './Intrested.svg'

import Address from './location.svg'; // Adjust the path based on your file structure
import StateImage from './State.svg'; // Adjust the path based on your file structure
import CityImage from './City.svg'; // Adjust the path based on your file structure
import Hear from './Hear.svg';
import Pincode from './Pincode.svg';
import CloseIcon from '@mui/icons-material/Close';

import Education from './Education.svg';
import FormContainer from './FormContainer.css';

import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
 
  MenuItem,
 
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Ensure you have this icon imported
import { FaBuilding } from 'react-icons/fa'; // Ensure you have these icons imported as well
import React, { useState,useEffect } from 'react';
// import { MenuItem, Typography, Box } from "@mui/material";
import Dropdown from "./Dropdown.svg";
// import { display } from "@mui/system";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResponsiveGrid = () => {

  // const [states, setStates] = useState(''); // To store fetched states
  // const [cities, setCities] = useState(''); // To store fetched cities
  const [selectedState, setSelectedState] = useState(""); // For selected state
  const [selectedCity, setSelectedCity] = useState(""); // For selected city
  const [postalCode, setPincode] = useState(""); 


  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');

  


  const [formData, setFormData] = useState({
   
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    gender: '',
    address: '',
    state: '',
    city: '',
    postalCode: '',
    Education: '',
    educationStatus: '',
    listenedDate: '',
    interestedFor: '',
   

  });// For pincode
  // useEffect(() => {
  //   fetchStates();
  // }, []);





  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    gender: '',
    address: '',
    interestedFor:'',
  });
  

  // Function to fetch states directly
  // const fetchStates = async () => {
  //   await fetch("https://countriesnow.space/api/v0.1/countries/states", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ iso2: "IN" }), // Assuming the country code is 'IN' for India
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.data.states && data.data.states.length > 0) {
  //         setStates(data.data.states); // Store fetched states
  //       } else {
  //         console.error("No states found");
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching states:", error));
  // };

  // Function to fetch cities for a selected state
  // const fetchCities = async(stateName) => {
  //   await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ country: "India", state: stateName }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.data && data.data.length > 0) {
  //         setCities(data.data); // Store fetched cities
  //       } else {
  //         setCities([]); // Clear cities if none found
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching cities:", error));
  // };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

//  formData.state=selectedState;
//  formData.city=selectedCity;
 

 console.log(formData.state);
 



    // Create the request options
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify(formData), // Convert formData to JSON string
    };




    // Send data to backend 
    fetch('https://newrepo-dzu5.onrender.com/api/submit', requestOptions)

        .then((response) => { 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // Handle the response from the server
            // You can display a success message or perform other actions
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
        toast.success("Form Submitted sucessfully",{
          position:"top-center"
        })


        setFormData({
          address: '',
    state: '',
    city: '',
    postalCode: '',
    Education: '',
    educationStatus: '',
    listenedDate: '',
          
        })

      }

  // Dummy function to fetch pincode for a city
  
  

  const [isNewForm, setIsNewForm] = useState(false); // State to track which form is displayed
  
  

  



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate email format
    if (name === 'email') {
      const isValidEmail = validateEmail(value);
      setEmailError(isValidEmail ? '' : 'Please enter a valid email address');
    }




    if (name === 'contact') {
      const isValidContact = validateContact(value);
      setContactError(isValidContact ? '' : 'Please enter a valid contact number');
    }

  };



  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    return emailPattern.test(email);
  };


  const validateContact = (contact) => {
    // Basic contact validation (e.g., only digits, length check)
    const contactPattern = /^[0-9]{10}$/; // Change the pattern based on your requirements
    return contactPattern.test(contact);
  };


  const isFormValid = () => {
    return Object.values(formData).every((field) => field!== '');
};







const isFormFilled =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.contact.length === 10 &&
    formData.gender &&
    formData.address &&
    !Object.values(errors).some((err) => err !== '');


  const handleCloseClick = () => {
    setIsNewForm(false); // Logic for closing the new form
  };
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((field) => field!== '');
    setIsButtonDisabled(!allFieldsFilled);
  }, [formData]);
 
  const handleArrowClick = () => {
    setIsNewForm(!isNewForm); // Toggle the form state
  };

  const handleNext = () => {
    if (!emailError && !contactError && formData.firstName!=='' && formData.lastName!=='' && formData.gender!=='' && formData. interestedFor!=='') {
    setIsNewForm(!isNewForm);
    }
  };
  
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      gender: '',
      interestedFor:"",
      address: '',
      state: '',
      city: '',
      postalCode: '',
      Education: '',
      educationStatus: '',
      listenedDate: '',
    });
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((field) => field!== '');
    setIsButtonDisabled(!allFieldsFilled);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    // Address validation
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    // State validation
    // if (!selectedState) {
    //   newErrors.state = 'State is required';
    // }

    // // City validation
    // if (!selectedCity) {
    //   newErrors.city = 'City is required';
    // }

    // Pincode validation (should be exactly 6 digits)
    if (!postalCode) {
      newErrors.postalCode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(postalCode)) {
      newErrors.postalCode = 'Pincode should be exactly 6 digits';
    }

    // Education validation
    if (!formData.Education) {
      newErrors.education = 'Education is required';
    }

    // Education Status validation
    if (!formData.educationStatus) {
      newErrors.educationStatus = 'Education Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="main-div">
    <ToastContainer />
    <Grid
    
    container
    spacing={0} // Default spacing
    sx={{
      // width: '100%', // Set full width
      // maxWidth: '1200px', // Limit max width to a specific size (adjust as needed)
      // backgroundColor: '#f5f5f5',
      // '@media (max-width:600px)': {
      //   spacing: 0,
      //   maxWidth: '100%', // Full width for smaller screens
      // },
    }}
    justifyContent="center" // Centers horizontally
    alignItems="center" // Centers vertically
  >
  
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{
          // backgroundColor: '#1f1f1f',
          
          color: '#ffffff',
          textAlign: 'center',
         
          //  padding: '20px',
          // borderradius: '8px',
          // Media query using the sx prop for custom styles
          '@media (max-width:600px)': {
            // backgroundColor: '#3f3f3f',
          },
        }}
      >
   

      <div className="responsiveDiv"
  style={{
    
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: '#f7f7f7',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    // height: "460px",
    width: "100%",
    paddingTop: "20px",
    borderradius: "36px", 
    
  }}
  
>
  <img
    src={bgimage}
    alt="Fixed"
    style={{
      width: '100%',         // Keeps the image responsive
      // maxWidth: '500px',     // Maximum width constraint
      height: 'auto',        // Keeps the aspect ratio of the image intact
      maxHeight: '300px',    // Set a maximum height if needed
      // display: 'block', 
      display: window.innerWidth <= 600 ? 'none' : 'block', 
          // Default display setting
    }}
 className="responsive-image"
  />
</div>



      </Grid>
      <div style={{    color: '#fff', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>
      
     <Container
     maxWidth={false} // Disable default maxWidth restrictions
     sx={{
       width: '100%', // Set container to 100% width of the parent
       maxWidth: '1200px', // Customize the maximum width (adjust this value as needed)
       mt: 1,
       backgroundColor: '#000',
       borderradius: '26px',
       padding: 2, // Uncomment if needed
      //  border: 'solid #f6ae22', // Uncomment if needed
     }}
   >
<Typography
  variant="h4"
  align="center"
  gutterBottom
  sx={{
    color: '#f6ae22',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }}
>
  {/* Update title based on the form state */}
  {isNewForm ? 'Step Two' : 'Enquiry Form'}

  {isNewForm ? ( 
    <ArrowBackIcon
      sx={{ position: 'absolute', left: '10px', color: '#f6ae22', cursor: 'pointer' }}
      onClick={handleArrowClick}
    />
  ) : (
    <CloseIcon
      sx={{ 
        position: 'absolute', 
        left: '10px', 
        color: '#f6ae22', 
        cursor: 'pointer',
        display: 'none'
      }}
      onClick={handleCloseClick}
    />
  )}
</Typography>

{/* Conditionally render Step One based on isNewForm */}
{!isNewForm && (
  <Typography
    variant="h6" // Smaller size for the subheading
    align="center"
    gutterBottom
    sx={{
      color: '#f6ae22',
      fontWeight: 'bold',
      marginTop: '16px', // Add space between the main title and subheading
    }}
  >
    Step One
  </Typography>
)}




        {isNewForm ? (
          <div>
            {/* Render the new form */}
           
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className="form-container" >
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Address} alt="Address Icon" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'white' },
                }}
                InputLabelProps={{
                  sx: {
                    color: '#f6ae22',
                    '&.Mui-focused': {
                      color: '#f6ae22',
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#f6ae22',
                      borderradius: '30px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#f6ae22',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f6ae22',
                    },
                  },
                }}
              />
  <Grid container spacing={1}>
<Grid item xs={4}>
     <TextField
  fullWidth
  label="State"
  value={formData.state}
  type="text" // Change to "text" for better control
  name="state"
  placeholder="state"
  onChange={handleChange}
  margin="normal"
  error={!!errors.pincode}
  helperText={errors.pincode || 'Enter a 6-digit pincode'}
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#f6ae22",
        borderradius: "30px",
      },
      "&:hover fieldset": {
        borderColor: "#f6ae22",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f6ae22",
      },
      "& input": {
        color: "#ffffff",
      },
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <img
          src={Pincode} // Replace with your actual image source
          alt="pincode"
          style={{ width: 20, height: 24, marginRight: 8 }}
        />
      </InputAdornment>
    ),
    style: {
      color: "#eeeeee",
      borderradius: "8px",
    },
  }}
  InputLabelProps={{
    sx: {
      color: "#f6ae22",
      "&.Mui-focused": {
        color: "#f6ae22",
      },
    },
  }}
/>





                </Grid>


                
<Grid item xs={4}>
     <TextField
  fullWidth
  label="city"
  value={formData.city}
  type="text" // Change to "text" for better control
  name="city"
  placeholder="city"
  onChange={handleChange}
  margin="normal"
  
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#f6ae22",
        borderradius: "30px",
      },
      "&:hover fieldset": {
        borderColor: "#f6ae22",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f6ae22",
      },
      "& input": {
        color: "#ffffff",
      },
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <img
          src={Pincode} // Replace with your actual image source
          alt="pincode"
          style={{ width: 20, height: 24, marginRight: 8 }}
        />
      </InputAdornment>
    ),
    style: {
      color: "#eeeeee",
      borderradius: "8px",
    },
  }}
  InputLabelProps={{
    sx: {
      color: "#f6ae22",
      "&.Mui-focused": {
        color: "#f6ae22",
      },
    },
  }}
/>





                </Grid>





                <Grid item xs={4}>
              <TextField
  fullWidth // Makes the TextField take up the full width of its container
  label="Pincode" // Label for the input field
  name="postalCode" // Name attribute for the input
  variant="outlined" // Outlined variant for the TextField
  type="text" // Explicitly specifies the input type as text
  value={formData.postalCode} // Controlled value from formData
onChange={handleChange}
  required // Indicates that this field is required
  placeholder="postalCode" // Placeholder text
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <PersonIcon sx={{ color: '#f6ae22' }} /> {/* Icon displayed inside the input */}
      </InputAdornment>
    ),
    style: {
      color: '#eeeeee', // Text color inside the input
      borderradius: '8px', // Border radius for the input
    },
  }}
  InputLabelProps={{
    sx: {
      color: '#f6ae22', // Color of the label
      '&.Mui-focused': {
        color: '#f6ae22', // Color of the label when focused
      },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f6ae22', // Border color for the input
        borderradius: '30px', // Border radius for the fieldset
      },
      '&:hover fieldset': {
        borderColor: '#f6ae22', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f6ae22', // Border color when focused
      },
    },
  }}
/>

              </Grid>
              </Grid>


                

              <Grid container spacing={2}>
                <Grid item xs={6}>
            
            <TextField
  fullWidth
  margin="normal"
  select
  label="Education"
  name="Education"
  value={formData.Education} // Ensure a fallback empty value is provided
  onChange={handleChange}
  error={!!errors.Education} // Handle error state (optional)
  helperText={errors.Education} // Helper text for errors (optional)
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <img
          src={Education} // Replace with your actual image source for the education icon
          alt="Education Icon"
          style={{ width: '20px', height: '20px', marginRight: '8px', cursor: 'pointer' }}
        />
      </InputAdornment>
    ),
  }}
  InputLabelProps={{
    sx: {
      color: '#f6ae22',
      '&.Mui-focused': {
        color: '#f6ae22',
      },
    },
  }}
  SelectProps={{
    displayEmpty: true, // Ensures a placeholder shows up
    IconComponent: () => (
      <img
        src={Dropdown} // Replace with your actual image source for the dropdown icon
        alt="Dropdown Icon"
        style={{ width: '10px', height: '10px', color: '#f6ae22', paddingRight: '30px', margin: '10px' }}
      />
    ),
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 200, // Limits the dropdown height to enable scrolling
          overflowY: 'auto',
          // borderradius: '30px',
        },
      },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f6ae22',
        borderradius: '30px',
      },
      '&:hover fieldset': {
        borderColor: '#f6ae22',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f6ae22',
      },
    },
    '& .MuiSelect-select': {
      color: formData.Education ? '#000000' : '#aaaaaa',
    },
    '& .MuiInputBase-input': {
      color: formData.Education ? '#ffff' : '#aaaaaa',
    },
  }}
  style={{ color: '#ffff' }}
>
  <MenuItem value="" sx={{ color: '#aaaaaa' }}>
    <em>Education</em> {/* Placeholder text color */}
  </MenuItem>
  <MenuItem
    value="High School"
    sx={{
      backgroundColor: '#f6ae22',
      '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
    }}
  >
    High School
  </MenuItem>
  <MenuItem
    value="Bachelor's Degree"
    sx={{
      backgroundColor: '#f6ae22',
      '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
    }}
  >
    Bachelor's Degree
  </MenuItem>
  <MenuItem
    value="Master's Degree"
    sx={{
      backgroundColor: '#f6ae22',
      '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
    }}
  >
    Master's Degree
  </MenuItem>
  <MenuItem
    value="PhD"
    sx={{
      backgroundColor: '#f6ae22',
      '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
    }}
  >
    PhD
  </MenuItem>
</TextField>


                </Grid>

                <Grid item xs={6}>
                <TextField
  fullWidth
  margin="normal"
  select
  label="Education Status"
  name="educationStatus"
  // value={formData.educationStatus || ""}
  value={formData.educationStatus}
  onChange={handleChange}
  error={!!errors.educationStatus}
  helperText={errors.educationStatus}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <img
          src={Education}
          alt="Graduation Cap"
          style={{ width: '20px', height: '20px', marginRight: '8px', cursor: 'pointer' }}
        />
      </InputAdornment>
    ),
  }}
  InputLabelProps={{
    sx: {
      color: '#f6ae22',
      '&.Mui-focused': {
        color: '#f6ae22',
      },
    },
  }}
  SelectProps={{
    displayEmpty: true,
    IconComponent: () => (
      <img
        src={Dropdown} // Replace with your actual image source
        alt="Dropdown Icon"
        style={{ width: '10px', height: '10px',color: '#f6ae22', paddingright: '30px', margin: '10px'  }}
      />
    ),
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 200, // Set the maximum height for the dropdown to enable scrolling
          overflowY: 'auto',
          // borderradius: '30px',
        },
      },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f6ae22',
        borderradius: '30px',
      },
      '&:hover fieldset': {
        borderColor: '#f6ae22',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f6ae22',
      },
    },
    '& .MuiSelect-select': {
      color: formData.educationStatus ? '#000000' : '#aaaaaa',
    },
    '& .MuiInputBase-input': {
      color: formData.educationStatus ? '#ffff' : '#aaaaaa',
    },
  }}
  style={{ color: '#ffff' }}
>
  <MenuItem value="" sx={{ color: '#aaaaaa' }}>
    <em>Education Status</em>
  </MenuItem>
  <MenuItem value="Completed" sx={{ backgroundColor: '#f6ae22', '&:hover': { backgroundColor: '#272425', color: '#ffffff' } }}>
    Completed
  </MenuItem>
  <MenuItem value="In Progress" sx={{ backgroundColor: '#f6ae22', '&:hover': { backgroundColor: '#272425', color: '#ffffff' } }}>
    In Progress
  </MenuItem>
  <MenuItem value="Not Completed" sx={{ backgroundColor: '#f6ae22', '&:hover': { backgroundColor: '#272425', color: '#ffffff' } }}>
    Not Completed
  </MenuItem>
  <MenuItem value="Dropped Out" sx={{ backgroundColor: '#f6ae22', '&:hover': { backgroundColor: '#272425', color: '#ffffff' } }}>
    Dropped Out
  </MenuItem>
</TextField>



</Grid>



              </Grid>

              <TextField
      fullWidth
      margin="normal"
      select
      label="When have you listened?"
      name="listenedDate"
      value={formData.listenedDate || ""} // Ensure a fallback empty value is provided
      onChange={handleChange}
      error={!!errors.listenedDate} // Handle error state (optional)
      helperText={errors.listenedDate} // Helper text for errors (optional)
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img
              src={Hear} // Replace with your actual image source for the "Hear" icon
              alt="Hear Icon"
              style={{ width: '20px', height: '20px', marginRight: '8px', cursor: 'pointer' }}
            />
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        sx: {
          color: '#f6ae22',
          '&.Mui-focused': {
            color: '#f6ae22',
          },
        },
      }}
      SelectProps={{
        displayEmpty: true, // Ensures a placeholder shows up
        IconComponent: () => (
          <img
            src={Dropdown} // Replace with your actual image source for the dropdown icon
            alt="Dropdown Icon"
            style={{ width: '10px', height: '10px', color: '#f6ae22', paddingRight: '30px', margin: '10px' }}
          />
        ),
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 200, // Limits the dropdown height to enable scrolling
              overflowY: 'auto',
              // borderradius: '30px',
            },
          },
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#f6ae22',
            borderradius: '30px',
          },
          '&:hover fieldset': {
            borderColor: '#f6ae22',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#f6ae22',
          },
        },
        '& .MuiSelect-select': {
          color: formData.listenedDate ? '#000000' : '#aaaaaa',
        },
        '& .MuiInputBase-input': {
          color: formData.listenedDate ? '#ffff' : '#aaaaaa',
        },
      }}
      style={{ color: '#ffff' }}
    >
     <MenuItem value="" sx={{ color: '#aaaaaa' }}>
  <em>When have you listened?</em> {/* Placeholder text color */}
</MenuItem>
<MenuItem
  value="linkedin"
  sx={{
    backgroundColor: '#f6ae22',
    '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
  }}
>
  LinkedIn
</MenuItem>
<MenuItem
  value="facebook"
  sx={{
    backgroundColor: '#f6ae22',
    '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
  }}
>
  Facebook
</MenuItem>
<MenuItem
  value="twitter"
  sx={{
    backgroundColor: '#f6ae22',
    '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
  }}
>
  Twitter
</MenuItem>
<MenuItem
  value="instagram"
  sx={{
    backgroundColor: '#f6ae22',
    '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
  }}
>
  Instagram
</MenuItem>
<MenuItem
  value="naukri"
  sx={{
    backgroundColor: '#f6ae22',
    '&:hover': { backgroundColor: '#272425', color: '#ffffff' },
  }}
>
  Naukri
</MenuItem>

    </TextField>



<Box display="flex" justifyContent="center" alignItems="center" mt={2}  gap={2}>
<Button
    variant="outlined"
    onClick={handleReset}
    sx={{
      backgroundColor: '#1f1f1f',
      borderColor: '#f6ae22',
      color: '#f6ae22',
      '&:hover': {
        backgroundColor: '#f6ae22',
        color: '#1f1f1f',
      },
      borderradius: '30px',
      padding: '10px 30px',
      textTransform: 'none',
    }}
  >
    Reset
  </Button>
  <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid}
          // disabled={isButtonDisabled}
          sx={{
            backgroundColor: '#f6ae22',
            color: '#1f1f1f',
            borderradius: '30px',
            padding: '10px 30px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#1f1f1f',
              color: '#f6ae22',
              border: '1px solid #f6ae22', // Adds a yellow border on hover
            },
          }}
        >
          Submit
        </Button>
</Box>

            </form>
          </div>
        ) : (
          <div>
         
         <form noValidate autoComplete="off" onSubmit={handleSubmit}  className="form-container" >
              {/* New form content goes here */}
            
              <div className="new"></div>
              <Grid container spacing={3}>
        <Grid item xs={12}>
            <Grid container spacing={2}>
             <Grid item xs={6}>
             <TextField
  fullWidth
  label="First Name"
  name="firstName"
  variant="outlined"
  value={formData.firstName}
  onChange={(e) => {
    // Validate to allow only letters (A-Z, a-z) and spaces
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(e.target.value)) {
      handleChange(e); // Call the original change handler if valid
    }
  }}
  required
  placeholder="Enter your first name"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <PersonIcon sx={{ color: '#f6ae22' }} />
      </InputAdornment>
    ),
    style: {
      color: '#eeeeee', // Text color changed to #eeeeee
      borderradius: '8px',
    },
  }}
  InputLabelProps={{
    sx: {
      color: '#f6ae22',
      '&.Mui-focused': {
        color: '#f6ae22',
      },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f6ae22',
        borderradius: '30px',
      },
      '&:hover fieldset': {
        borderColor: '#f6ae22',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f6ae22',
      },
      '& input': {
        color: '#eeeeee', // Text color inside the input field
      },
    },
  }}
/>


              </Grid>
              <Grid item xs={6}>
              <TextField
  fullWidth // Makes the TextField take up the full width of its container
  label="Last Name" // Label for the input field
  name="lastName" // Name attribute for the input
  variant="outlined" // Outlined variant for the TextField
  type="text" // Explicitly specifies the input type as text
  value={formData.lastName} // Controlled value from formData
onChange={(e) => {
    // Validate to allow only letters (A-Z, a-z) and spaces
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(e.target.value)) {
      handleChange(e); // Call the original change handler if valid
    }
  }}
  required // Indicates that this field is required
  placeholder="Enter your last name" // Placeholder text
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <PersonIcon sx={{ color: '#f6ae22' }} /> {/* Icon displayed inside the input */}
      </InputAdornment>
    ),
    style: {
      color: '#eeeeee', // Text color inside the input
      borderradius: '8px', // Border radius for the input
    },
  }}
  InputLabelProps={{
    sx: {
      color: '#f6ae22', // Color of the label
      '&.Mui-focused': {
        color: '#f6ae22', // Color of the label when focused
      },
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f6ae22', // Border color for the input
        borderradius: '30px', // Border radius for the fieldset
      },
      '&:hover fieldset': {
        borderColor: '#f6ae22', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f6ae22', // Border color when focused
      },
    },
  }}
/>

              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
        error={!!emailError} // Show error styling
        helperText={emailError} // Display error message
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={Email}
                alt="Email Icon"
                style={{ width: 24, height: 24 }}
              />
            </InputAdornment>
          ),
          style: {
            color: '#eeeeee', // Text color changed to #eeeeee
            borderradius: '8px',
          },
        }}
        InputLabelProps={{
          sx: {
            color: '#f6ae22',
            '&.Mui-focused': {
              color: '#f6ae22',
            },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#f6ae22',
              borderradius: '30px',
            },
            '&:hover fieldset': {
              borderColor: '#f6ae22',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f6ae22',
            },
          },
        }}
      />
              </Grid>

              <Grid item xs={6}>
              <TextField
        fullWidth
        label="Contact Details"
        name="contact"
        type="tel"
        variant="outlined"
        value={formData.contact}
        onChange={handleChange}
        required
        placeholder="Enter your contact number"
        error={!!contactError} // Show error styling
        helperText={contactError} // Display error message
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src={Contact}
                alt="Contact Icon"
                style={{ width: 24, height: 24 }}
              />
            </InputAdornment>
          ),
          style: {
            color: '#eeeeee', // Text color changed to #eeeeee
            borderradius: '8px',
          },
        }}
        InputLabelProps={{
          sx: {
            color: '#f6ae22',
            '&.Mui-focused': {
              color: '#f6ae22',
            },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#f6ae22',
              borderradius: '30px',
            },
            '&:hover fieldset': {
              borderColor: '#f6ae22',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f6ae22',
            },
          },
        }}
      />

              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
        <Grid container spacing={9} alignItems="center">
          {/* Gender Label */}
          <Grid item xs={2}>
            <Typography variant="h6" sx={{ color: '#f6ae22' }} className="gen">
              Gender:
            </Typography>
          </Grid>

          {/* Gender Options - Female and Male */}
          <Grid item xs={10} className="gen">
            <RadioGroup
              row
              name="gender"
              value={formData.gender} // Binding gender value from formData
              onChange={handleChange} // onChange event to handle form changes
            >
              {/* Female Option */}
              <FormControlLabel className="gen"
                value="F"
                control={
                  <Radio
                    sx={{
                      color: '#f6ae22',
                      '&.Mui-checked': {
                        color: '#f6ae22',
                      },
                    }}
                  />
                }
                label={
                  <Grid container alignItems="center">
                    <img
                      src={Female} // Use the image URL for Female
                      alt="Female"
                      style={{ width: 34, height: 24, marginRight: 8 }} // Adjust image size
                    />
                    <Typography variant="body1" sx={{ color: '#f6ae22' }}>
                      Female 
                    </Typography>
                  </Grid>
                }
              />

              {/* Male Option */}
              <FormControlLabel className="gen"
                value="M"
                control={
                  <Radio
                    sx={{
                      color: '#f6ae22',
                      '&.Mui-checked': {
                        color: '#f6ae22',
                      },
                    }}
                  />
                }
                label={
                  <Grid container alignItems="center" className="gen">
                    <img
                      src={Male} // Use the image URL for Male
                      alt="Male"
                      style={{ width: 34, height: 24, marginRight: 8 }} // Adjust image size
                    />
                    <Typography variant="body1" sx={{ color: '#f6ae22' }}>
                      Male 
                    </Typography>
                  </Grid>
                }
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
        

      <TextField
  fullWidth
  margin="normal"
  select
  label="Interested For"
  name="interestedFor"
  value={formData.interestedFor}
  onChange={handleChange}
  placeholder="Select your interest"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <img src={Intrested} alt="Interest Icon" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
      </InputAdornment>
    ),
    style: { color: 'white' },
  }}
  InputLabelProps={{
    sx: {
      color: '#f6ae22',
      '&.Mui-focused': {
        color: '#f6ae22',
      },
    },
  }}
  SelectProps={{
    displayEmpty: true,
    IconComponent: () => (
      <img
        src={Dropdown} // Replace with your actual dropdown icon source
        alt="Dropdown Icon"
        style={{ width: '10px', height: '10px', paddingRight: '30px', margin: '10px' }}
      />
    ),
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 200,
        },
      },
    },
  }}
  sx={{
    width: '100%', // Adjust the width as needed (e.g., 75% or a fixed width like '300px')
    marginLeft: '25px', // Adjust this value to move it slightly to the right
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#f6ae22',
        borderradius: '30px',
      },
      '&:hover fieldset': {
        borderColor: '#f6ae22',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f6ae22',
      },
    },
    '& .MuiSelect-select': {
      color: formData.interestedFor ? '#fffff' : '#aaaaaa',
    },
  }}
>
  <MenuItem value="" sx={{ color: '#aaaaaa' }}>
    <em>Interested For</em>
  </MenuItem>
  <MenuItem value="Web Development" sx={{ backgroundColor: '#f6ae22', '&:hover': { backgroundColor: '#272425', color: '#ffffff' } }}>
    Web Development
  </MenuItem>
  <MenuItem value="UI/UX Design" sx={{ backgroundColor: '#f6ae22', '&:hover': { backgroundColor: '#272425', color: '#ffffff' } }}>
    UI/UX Design
  </MenuItem>
  <MenuItem value="Data Science" sx={{ backgroundColor: '#f6ae22', '&:hover': { backgroundColor: '#272425', color: '#ffffff' } }}>
    Data Science
  </MenuItem>
</TextField>





<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  sx={{
    width: '100%',
    mt: 2,
  }}
>
  <Button
    variant="outlined"
    onClick={handleReset}
    sx={{
      backgroundColor: '#1f1f1f',
      borderColor: '#f6ae22',
      color: '#f6ae22',
      '&:hover': {
        backgroundColor: '#f6ae22',
        color: '#1f1f1f',
      },
      borderradius: '30px',
      padding: '10px 30px',
      textTransform: 'none',
      width: '150px', // Adjust width as needed
      mx: 1, // Horizontal margin to space buttons apart
    }}
  >
    Reset
  </Button>

  <Button
    variant="contained"
    type="button"
    onClick={handleNext}
    sx={{
      backgroundColor: '#f6ae22',
      color: '#1f1f1f',
      borderradius: '30px',
      padding: '10px 30px',
      textTransform: 'none',
      width: '150px', // Adjust width as needed
      mx: 1, // Horizontal margin to space buttons apart
      '&:hover': {
        backgroundColor: '#1f1f1f',
        color: '#f6ae22',
        border: '1px solid #f6ae22',
      },
    }}
  >
    Next
  </Button>
</Box>


 



        </Grid>
           
            </form>
         
        {/* </div> */}
          </div>
        )}
      </Container>
    </div>
    
    </Grid>
    </div>
  );
};

export default ResponsiveGrid;






