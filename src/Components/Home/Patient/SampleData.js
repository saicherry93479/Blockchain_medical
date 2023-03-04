export const manfracturerSample=["Cipla Ltd","Abbott India Ltd","Zydus Lifesciences","Divis Laboratories","Sun Pharmaceutical Industries","Torrent Pharmaceuticals Ltd.","A.D. Pharmaceuticals","Galpha Laboratories Ltd","Hamax Pharmaceuticals","La Med India","Maa Formulation Pvt. Ltd.","Radico Remedies","Tablets (India) Limited","Uniroyal Biotech","V&B Healthcare"]
export const descriptionSample=["An antihistamine used to treat allergies and cold symptoms","A pain reliever, anti-inflammatory, and blood thinner","An antibiotic used to treat bacterial infections","A steroid used to treat inflammation and autoimmune disorder","An antiviral medication used to treat the flu.","An antidepressant medication used to treat depression and anxiety","a pain reliever and fever reducer","a medication used to lower cholesterol levels","a medication used to prevent and treat asthma and allergic rhinitis","an antidepressant medication used to treat depression, anxiety, and other mental health conditions","a pain reliever and fever reducer","a NSAID used to reduce pain, inflammation, and fever"," a proton pump inhibitor used to treat acid reflux and stomach ulcers"]


export const searchRecordsUpdate=(data,input)=>{
    var da=[]
    for(let i=0;i<data.length;i++){
        const dat=getUniqueValue(input,i)
        var ran=dat[0]
        var ranOne=dat[1]
        console.log("ran is ",ran," ranone is ",ranOne)
        var d1=[]
        

        d1.push(data[i].split('-')[0])
     
        d1.push(manfracturerSample[ran])
        d1.push(descriptionSample[ranOne])
        let price=getRndInteger(100,250);
        d1.push(price)
        da.push(d1)
    }
    return da
    

}

function getUniqueValue(dat,inn){
    let sum=inn;
    for(let i=0;i<dat.length;i++){
        sum+=dat.charCodeAt(i);

    }
    console.log("sum is ",sum)
    return [sum % manfracturerSample.length,sum % descriptionSample.length]

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}