import { useState, useEffect, useRef } from 'react';
import { Form, FormItem } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { Toaster } from "@/components/ui/sonner";  
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table" 
import { Label } from '@/components/ui/label';
import axiosClient from "../axios-client.js";
import ReviewModal from '../components/dialogs/ReviewModal.jsx';
import { useStateContext } from '../contexts/ContextProvider.jsx'; // Import the context
import { DialogClose } from '@radix-ui/react-dialog';
import { Check } from 'lucide-react';


const formSchema = z.object({
});


export default function AddStudent() {

    const [siblings, setSiblings] = useState([]);
    const [siblingInput, setSiblingInput] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        dob: '',
        educationalAttainment: '',
    });
    const [scholarships, setScholarships] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [files, setFiles] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [cities2, setCities2] = useState([]);
    const [barangays2, setBarangays2] = useState([]);
    const [addressSimilarity, setAddressSimilarity] = useState(false);
    const [open, setOpen] = useState(false);


    useEffect(() => {
            loadFirstResources();
        }, []);

    const calculateAge = (dob) => {
      
        const birthDate = new Date(dob);
        const today = new Date();
      
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
      
        // Adjust age if the birthday hasn't occurred yet this year
        if (
          monthDifference < 0 || 
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
      
        return age;
    };

    const loadFirstResources = () => {
        axiosClient.get('/addstudent')
      .then((response) => {
        setScholarships(response.data.scholarships);
        setProvinces(response.data.provinces);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    }


    const addSibling = () => {
        const { firstName, middleName, lastName, suffix, dob, educationalAttainment } =
      siblingInput;

      if (
        firstName === "" ||
        lastName === "" ||
        dob === "" ||
        educationalAttainment === ""
      ) {
        alert("Please fill in all fields.");
        return;
      }
  
      const duplicate = siblings.find(
        (sibling) =>
          sibling.firstName === firstName &&
          sibling.lastName === lastName &&
          sibling.suffix === suffix &&
          sibling.dob === dob
      );
      if (duplicate) {
        alert("This sibling already exists.");
        return;
      }

      setSiblings([
        ...siblings,
        {
            firstName,
            middleName,
            lastName,
            suffix,
            dob,
            educationalAttainment,
        },
    ]);
      setSiblingInput({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        dob: "",
        educationalAttainment: "",
      });

      setOpen(false);
    };

    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm({
            resolver: zodResolver(formSchema),
    });

    const handleRemoveSibling = (index) => {
        setSiblings((prevSiblings) => prevSiblings.filter((_, i) => i !== index));
    };

    const handleProvinceChange = (provinceName, addresstype) => {
        const provinceId = provinces.find((p) => p.name === provinceName)?.id;

        if (provinceId) {
            axiosClient.get(`/cities/${provinceId}`)
                .then(response => {
                    if (addresstype === 'permanent') setCities(response.data);
                    else setCities2(response.data);
                    console.log(response.data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            if (addresstype === 'permanent') setCities([]);
            else setCities2([]);
        }
    };

    const handleSubmitFile = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[index].is_submitted = !newFiles[index].is_submitted;
            return newFiles;
        });
      };

    const handleCityChange = (cityName, addresstype) => {
        const isPermanent = addresstype === 'permanent';
        let cityId = 0;

        if (isPermanent) cityId = cities.find((c) => c.name === cityName)?.id;
        else cityId = cities2.find((c) => c.name === cityName)?.id;

        debugger;

        if (cityId) {
            axiosClient.get(`/barangays/${cityId}`)
                .then(response => {
                    if (isPermanent) setBarangays(response.data);
                    else setBarangays2(response.data);
                    console.log(response.data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            if (isPermanent) setBarangays([]);
            else setBarangays2([]);
        }
    };

    const handleCheckboxChange = (e) => {
        if (addressSimilarity) setAddressSimilarity(false);
        else setAddressSimilarity(true);      
    };

    const handleScholarshipChange = (scholarshipName) => {
        const scholarshipId = scholarships.find((s) => s.name === scholarshipName)?.id;
        setValue("scholarship", scholarshipId);

        if (scholarshipId) {
            axiosClient.get(`/reqfiles/${scholarshipId}`)
                .then(({data}) => {
                    setFiles(data.data);
                    console.log(data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            setFiles([]);
        }
    };

    const onSubmit = (data) => {

        const scholarshipData = {
            prevSchool: data?.prevSchool?.trim(),
            prevSchoolLandline: data?.prevSchoolLandline ? data.prevSchoolLandline.trim() : null,
            prevSchoolEmail: data?.prevSchoolEmail?.toLowerCase().trim(),
        };

        const organization = {
            studentNo: data?.studentNo?.trim(),
            studentEmail: data?.studentEmail?.trim(),
        }

        const personal = {
            firstName: data?.firstName,
            middleName: data?.middleName?.trim(),
            lastName: data?.lastName?.trim(),
            suffix: data?.suffix?.trim(),
            dob: data?.dob,
            email: data?.email?.trim(),
            mobileNum: data?.mobileNum?.trim(),
            landline: data?.landline?.trim(),
        }

        const permAddress = {
            houseBlockUnitNo: data?.permHouse,
            street: data?.permStreet,
            zipCode: data?.permZip?.trim(),
        }

        const sameAddress = addressSimilarity;

        const mailAddress = {
            houseBlockUnitNo: data?.mailHouse,
            street: data?.mailStreet,
            zipCode: data?.mailZip?.trim(),
        }

        const father = {
            firstName: data?.fatherFirstName,
            middleName: data?.fatherMiddleName,
            lastName: data?.fatherLastName,
            suffix: data?.fatherSuffix,
            email: data?.fatherEmail,
            mobileNum: data?.fatherMobileNum,
            landline: data?.fatherLandline,
            occupation: data?.fatherOccupation,
            officeNo: data?.fatherOfficeNo,           
        }

        const mother = {
            firstName: data?.motherFirstName,
            middleName: data?.motherMiddleName,
            lastName: data?.motherLastName,
            suffix: data?.motherSuffix,
            email: data?.motherEmail,
            mobileNum: data?.motherMobileNum,
            landline: data?.motherLandline,
            occupation: data?.motherOccupation,
            officeNo: data?.motherOfficeNo,
        }

        const siblingsData = siblings;

        const filesData = files;

        const payload ={
            scholarshipData,
            organization,
            personal,
            permAddress,
            sameAddress,
            mailAddress,
            father,
            mother,
            siblingsData,
            filesData,           
        }

        console.log(payload);
    }
  
    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg pt-1">Add Student</h1>
                <Button className="hover:bg-slate-500 border hover:black hover:text-white" onClick={() => window.history.back()}>Cancel</Button>
            </div>
            <Form>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>                               
                    <Card>
                        <CardHeader>
                            <CardTitle>Scholarship</CardTitle>                    
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>
                            <Label>Previous School</Label>
                            <FormItem>                       
                                <Input type="text" {...register('prevSchool')} className={`w-[100%] mb-3 ${errors.prevSchool ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem>
                                    <Label>Landline</Label>
                                    <Input type="text" {...register('prevSchoolLandline')} className={`w-[100%] mb-3 ${errors.prevSchoolLandline ? 'border-red-500' : ''}`}/>
                                </FormItem>
                                <FormItem>
                                    <Label>Email</Label>
                                    <Input type="text" {...register('prevSchoolEmail')} className={`min-w-[300px] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                </FormItem>
                            </div>
                            <FormItem>
                                <Select  onValueChange={(value) => handleScholarshipChange(value)}>
                                    <SelectTrigger className="w-[100%]">
                                        <SelectValue placeholder="Select a Scholarship" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {scholarships.map((scholarships, index) => (
                                            <SelectItem key={index} value={scholarships.name} disabled={scholarships.is_full}>
                                                <div className='flex w-full justify-between items-center'>
                                                    <span className={scholarships.is_full ? "text-gray-400" : ""}>{scholarships.name}</span>
                                                    <div className='flex flex-row ml-[100px]'>
                                                        <span className={scholarships.is_full ? "text-gray-400" : ""}>{scholarships.taken_slots}</span>
                                                        <span className={scholarships.is_full ? "text-gray-400" : ""}>/</span>
                                                        <span className={scholarships.is_full ? "text-gray-400" : ""}>{scholarships.max_slots}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>                           
                                </Select>
                            </FormItem>                       
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-row gap-[10%]'>
                            <FormItem className='w-[50%]'>
                                <Label>MMCM Student No.</Label>
                                <Input type="text" {...register('studentNo')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <FormItem className='w-[50%]'>
                                <Label>School Email</Label>
                                <Input type="text" {...register('studentEmail')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                            </FormItem>                  
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>
                            <FormItem>
                                <Label>First Name</Label>
                                <Input type="text" {...register('firstName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <FormItem>
                                <Label>Middle Name</Label>
                                <Input type="text" {...register('middleName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <FormItem>
                                <Label>Last Name</Label>
                                <Input type="text" {...register('lastName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`} />
                            </FormItem>
                            <div className='flex flex-row gap-[10%]'>
                                <FormItem>
                                    <Label>Suffix</Label>
                                    <Input type="text" {...register('suffix')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                </FormItem>
                                <FormItem>
                                    <Label>Date of Birth</Label>
                                    <Input {...register('dob')} type='Date' className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                </FormItem>
                            </div>                      
                            <FormItem>
                                <Label>Personal Email</Label>
                                <Input type="text" {...register('email')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <div className='flex flex-row gap-[10%] w-[100%]'>
                                <FormItem className='w-[50%]'>
                                    <Label>Mobile Number</Label>
                                    <Input type="text" {...register('mobileNum')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                </FormItem>
                                <FormItem className='w-[50%]'>
                                    <Label>Landline Number</Label>
                                    <Input type="text" {...register('landline')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                </FormItem>
                            </div>                       
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Permanent Address</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>
                            <FormItem>
                                <Label>House/Block/Unit No.</Label>
                                <Input type="text" {...register('permHouse')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                            </FormItem>
                            <FormItem>
                                <Label>Street</Label>
                                <Input type="text" {...register('permStreet')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                            </FormItem> 
                            <FormItem>
                                <Label>Province</Label>
                                <Select onValueChange={(value) => handleProvinceChange(value, 'permanent')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {provinces.map((provinces, index) => (
                                                <SelectItem key={index} value={provinces.name}>
                                                    {provinces.name}
                                                </SelectItem>
                                            ))}                           
                                        </SelectContent>
                                </Select>
                            </FormItem>                    
                            <FormItem>
                                <Label>City</Label>
                                <Select onValueChange={(value) => handleCityChange(value, 'permanent')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map((cities, index) => (
                                                    <SelectItem key={index} value={cities.name}>
                                                        {cities.name}
                                                    </SelectItem>
                                                ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>                       
                            <FormItem>
                                <Label>Barangay</Label>
                                <Select className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Barangay" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {barangays.map((barangays, index) => (
                                                        <SelectItem key={index} value={barangays.name}>
                                                            {barangays.name}
                                                        </SelectItem>
                                                    ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                            <div>
                                <Label>Zip Code</Label>
                                <div className='flex flex-row gap-[10%] justify-between'>
                                    <FormItem>                               
                                        <Input type="text" {...register('permZip')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}  />
                                    </FormItem>
                                    <div className='flex flex-row gap-3 text-center'>
                                        <Checkbox onClick={handleCheckboxChange}></Checkbox>
                                        <Label>Use permanent address as mailing address</Label>
                                    </div>
                                </div>                                                                        
                            </div>                        
                        </CardContent>
                    </Card>
                    {!addressSimilarity && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Mailing Address</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5'>
                                <FormItem>
                                    <Label>House/Block/Unit No.</Label>
                                    <Input type="text" {...register('mailHouse')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                </FormItem>
                                <FormItem>
                                    <Label>Street</Label>
                                    <Input type="text" {...register('mailStreet')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                </FormItem>  
                                <FormItem>
                                    <Label>Province</Label>
                                    <Select onValueChange={(value) => handleProvinceChange(value, 'mailing')}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Province" />
                                            </SelectTrigger>
                                            <SelectContent>                                       
                                                {provinces.map((provinces, index) => (
                                                    <SelectItem key={index} value={provinces.name}>
                                                        {provinces.name}
                                                    </SelectItem>
                                                ))}                           
                                            </SelectContent>
                                    </Select>
                                </FormItem>                   
                                <FormItem>
                                    <Label>City</Label>
                                    <Select onValueChange={(value) => handleCityChange(value, 'mailing')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities2.map((cities2, index) => (
                                                        <SelectItem key={index} value={cities2.name}>
                                                            {cities2.name}
                                                        </SelectItem>
                                                    ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>                      
                                <FormItem>
                                    <Label>Barangay</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Barangay" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {barangays2.map((barangays2, index) => (
                                                            <SelectItem key={index} value={barangays2.name}>
                                                                {barangays2.name}
                                                            </SelectItem>
                                                        ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <div>
                                    <Label>Zip Code</Label>
                                    <div className='flex flex-row gap-[10%] justify-between'>
                                        <FormItem>                               
                                            <Input type="text" {...register('mailZip')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`} />
                                        </FormItem>
                                    </div>                                                                        
                                </div>                        
                            </CardContent>
                        </Card>
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle>Family Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label className='text-bottom'>Father</Label>
                                <div className='m-5'>
                                    <FormItem>
                                        <Label>First Name</Label>
                                        <Input type="text" {...register('fatherFirstName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Middle Name</Label>
                                        <Input type="text" {...register('fatherMiddleName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Last Name</Label>
                                        <Input type="text" {...register('fatherLastName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%]'>
                                        <FormItem>
                                            <Label>Suffix</Label>
                                            <Input type="text" {...register('fatherSuffix')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>                      
                                    <FormItem>
                                        <Label>Personal Email</Label>
                                        <Input type="text" {...register('fatherEmail')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Mobile Number</Label>
                                            <Input type="text" {...register('fatherMobileNum')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Landline Number</Label>
                                            <Input type="text" {...register('fatherLandline')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Occupation</Label>
                                            <Input type="text" {...register('fatherOccuptaion')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Office No.</Label>
                                            <Input type="text" {...register('fatherOfficeNo')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>
                                </div>                         
                            </div>
                            <div>
                                <Label>Mother</Label>
                                <div className='m-5'>
                                    <FormItem>
                                        <Label>First Name</Label>
                                        <Input type="text" {...register('motherFirstName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Middle Name</Label>
                                        <Input type="text" {...register('motherMiddleName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <FormItem>
                                        <Label>Last Name</Label>
                                        <Input type="text" {...register('motherLastName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%]'>
                                        <FormItem>
                                            <Label>Suffix</Label>
                                            <Input type="text" {...register('motherSuffixName')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>                      
                                    <FormItem>
                                        <Label>Personal Email</Label>
                                        <Input type="text" {...register('motherEmail')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                    </FormItem>
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Mobile Number</Label>
                                            <Input type="text" {...register('motherMobileNum')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Landline Number</Label>
                                            <Input type="text" {...register('motherLandline')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>  
                                    <div className='flex flex-row gap-[10%] w-[100%]'>
                                        <FormItem className='w-[50%]'>
                                            <Label>Occupation</Label>
                                            <Input type="text" {...register('motherOccupation')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                        <FormItem className='w-[50%]'>
                                            <Label>Office No.</Label>
                                            <Input type="text" {...register('motherOfficeNo')} className={`w-[100%] mb-3 ${errors.name ? 'border-red-500' : ''}`}/>
                                        </FormItem>
                                    </div>                             
                                </div>                           
                            </div>    
                            <div>
                                <Label>Siblings</Label>
                                <div className='m-5'>
                                    <Table className='mb-5 min-h-[100px] rounded-md border-2 border-solid border-grey-100 shadow-sm'>
                                        <TableHeader className=''>
                                            <TableRow>
                                                <TableHead>First Name</TableHead>
                                                <TableHead>Middle Name</TableHead>
                                                <TableHead>Last Name</TableHead>
                                                <TableHead>Suffix</TableHead>
                                                <TableHead>Age</TableHead>
                                                <TableHead>Educational Attainment</TableHead>
                                                <TableHead></TableHead>
                                            </TableRow>                                       
                                        </TableHeader>
                                        <TableBody>
                                            {siblings.length > 0 ? (
                                                siblings.map((sibling, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{sibling.firstName}</TableCell>
                                                        <TableCell>{sibling.middleName}</TableCell>
                                                        <TableCell>{sibling.lastName}</TableCell>
                                                        <TableCell>{sibling.suffix}</TableCell>
                                                        <TableCell>{calculateAge(sibling.dob)}</TableCell>
                                                        <TableCell>{sibling.educationalAttainment}</TableCell>
                                                        <TableCell>
                                                            <button
                                                                onClick={() => handleRemoveSibling(index)}
                                                                className='text-red-500 hover:underline'
                                                            >
                                                                Remove
                                                            </button>
                                                        </TableCell>
                                                    </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={8} className='text-center text-gray-500'>
                                                            No siblings added yet.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                    </Table>
                                    <div className='flex justify-end'>
                                        <Dialog open={open} onOpenChange={setOpen}>    
                                            <DialogTrigger asChild>
                                                <Button>Add Sibling</Button>                                       
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add Sibling</DialogTitle>
                                                </DialogHeader>
                                                <Label>First Name</Label>
                                                <Input value={siblingInput.firstName} onChange={(e) => setSiblingInput({ ...siblingInput, firstName: e.target.value })}/>
                                                <Label>Middle Name</Label>
                                                <Input value={siblingInput.middleName} onChange={(e) => setSiblingInput({ ...siblingInput, middleName: e.target.value })}/>
                                                <Label>Last Name</Label>
                                                <Input value={siblingInput.lastName} onChange={(e) => setSiblingInput({ ...siblingInput, lastName: e.target.value })} />

                                                <div className='flex flex-row gap-[10%]'>
                                                    <div>
                                                        <Label>Suffix</Label>
                                                        <Input  value={siblingInput.suffix} onChange={(e) => setSiblingInput({ ...siblingInput, suffix: e.target.value })} />
                                                    </div>  
                                                    <div>
                                                        <Label>Date of Birth</Label>
                                                        <Input value={siblingInput.dob} type='Date' onChange={(e) => setSiblingInput({ ...siblingInput, dob: e.target.value })}/>
                                                    </div>                                                                                                   
                                                </div>  
                                                <Label>Educational Attainment</Label>
                                                <Input  value={siblingInput.educationalAttainment} onChange={(e) => setSiblingInput({...siblingInput,educationalAttainment: e.target.value,})}/>
                                                <DialogFooter className='flex justify-between'>   
                                                    <DialogClose>
                                                        <Button className='w-20'>Cancel</Button>
                                                    </DialogClose>                                            
                                                    <Button onClick={addSibling} className='w-20'>Add</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>                   
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label>Select submitted required files.</Label>
                            <div className='flex flex-col justify-center p-5'>
                                <ul className='grid grid-cols-2 gap-5'>
                                    {files.map((files, index) => (
                                        <li key={index} value={files.name}>
                                            <div className='flex gap-10'>
                                                <Checkbox onClick={() => handleSubmitFile(index)}></Checkbox>
                                                <Label>{files.name}</Label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>                      
                        </CardContent>
                    </Card>
                    <div className='flex justify-center'>
                        <Button type="submit" className='w-[200px] mb-5 bg-white'>Confirm</Button>
                    </div>
                </form>
            </Form>  
    </div>
    );  
}