import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../utils/config";
import { FieldSetLayout } from "../components/feildsetlayout";
import DataTable1 from "../components/table1";
export default function BilledAndNotBilled() {
    useEffect(()=>{
        getAllBilled()
    },[])
    const [tabledata,setTableData]=useState([])

  //   const mergeData = (data) => {
  //     const result = [];

  // data.forEach(item => {
  //   if (item.jointid) {
  //     // Check if the jointid already has an entry in the result
  //     let existing = result.find(entry => entry.jointid === item.jointid);

  //     if (existing) {
  //       // Add the broker details to the existing entry
  //       existing.brokers.push({
  //         brokername: item.brokername,
  //         "payedtobroker.rate": item.payedtobroker.rate,
  //         "payedtobroker.amount": item.payedtobroker.amount,
  //       });
  //     } else {
  //       // Create a new entry for this jointid
  //       result.push({
  //         date: item.date,
  //         brokers: [{
  //           brokername: item.brokername,
  //           "payedtobroker.rate": item.payedtobroker.rate,
  //           "payedtobroker.amount": item.payedtobroker.amount,
  //         }],
  //         labourname: item.labourname || '-',
  //         localweight: item.localweight,
  //         companyname: item.companyname,
  //         companyweight: item.companyweight,
  //         "billed.rate": item.billed.rate,
  //         "billed.amount": item.billed.amount,
  //         jointid: item.jointid,
  //       });
  //     }
  //   } else {
  //     // If no jointid, add the entry directly
  //     result.push({
  //       date: item.date,
  //       brokers: [{
  //         brokername: item.brokername,
  //         "payedtobroker.rate": item.payedtobroker.rate,
  //         "payedtobroker.amount": item.payedtobroker.amount,
  //       }],
  //       labourname: item.labourname || '-',
  //       localweight: item.localweight,
  //       companyname: item.companyname,
  //       companyweight: item.companyweight,
  //       "billed.rate": item.billed.rate,
  //       "billed.amount": item.billed.amount,
  //     });
  //   }
  // });

  // return result;
  //   };

    const getAllBilled = async () => {
        await axios.get(`${baseUrl}/bill`)
          .then((res) => {
            if (res) {
              setTableData( res.data)
             
              // console.log(res.data)
            }
          })
          .catch((error) => {
            if (error?.response?.status === 404) {
              alert(error.response.data);
            } else {
              alert('Internal Server Error');
            }
          });
      }
    return (
        <>
        <FieldSetLayout >
          <DataTable1 data={tabledata} />
          </FieldSetLayout>
        </>
    )
}