import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";

export function encrypt(info, sessiondate){
    secureLocalStorage.clear()
    const sessionInfo = {userInfo: info, sessionDate:sessiondate}
    secureLocalStorage.setItem('sessionInfo' , sessionInfo) 
}


// decrypt saved data in secure local storage
// let decryptedData = secureLocalStorage.getItem('sessionInfo')

export let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = `${mm}/${dd}/${yyyy}`



//verify session data
export const verifySession = ()=>{
    const router = useRouter()
    let decryptedData = secureLocalStorage.getItem('sessionInfo')

    if(decryptedData !== null){
        const sessionDate = decryptedData.sessionDate
        if(today !== sessionDate){
            router.push('/')
        }
    }
}


//verify user permissions and authority
export function verifyPermission(router){
    let decryptedData = secureLocalStorage.getItem('sessionInfo')
    // let pages = decryptedData?.userInfo[0].data.Pages.map((page=>page.path))

    const currentPath = router.pathname
    // const accessability = pages?.indexOf(currentPath)
    
    // if(accessability < 0){router.push('/main')
    // alert("You haven't Permission")
    // }
}