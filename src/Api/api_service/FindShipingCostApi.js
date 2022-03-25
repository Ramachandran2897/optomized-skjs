import axios from "axios"
const findShipingCostApi = ({pincode, weight})=>{
    return axios.post(`https://test.sequel247.com/api/shipment/create`, {
        "token" : "85403fca3d4a4641071d3cc503625744",
        "location":"domestic",
        "shipmentType": "D&J",
        "serviceType":"valuable",
        "fromStoreCode":"LDHJDN",
        "toAddress": {
            "consignee_name" : "Siddharth Deshpande",
            "address_line1": "House No: 3405, Gondhali",
            "address_line2": "Galli",
            "pinCode" : pincode,
            "auth_receiver_name": "Ketan",
            "auth_receiver_phone": "7795542100"
        },
        "net_weight": weight,
        "gross_weight": weight,
        "net_value": "454645",
        "codValue": "49999",
        "no_of_packages": "2",
        "boxes": [{
                    "box_number" : "ZV_EFD789",
                    "lock_number": "LK_7845",
                    "length": "10",
                    "breadth": "4",
                    "height": "10",
                    "gross_weight": "512"
                },
                {
                    "box_number" : "ZV_EFD789",
                    "lock_number": "LK_7845",
                    "length": "10",
                    "breadth": "4",
                    "height": "10",
                    "gross_weight": "512"
                }],
        "invoice":[
            "764545465",
            "4658794564",
            "89465w"
        ],
        "remark": "Handle with care"
    });
}
export default findShipingCostApi