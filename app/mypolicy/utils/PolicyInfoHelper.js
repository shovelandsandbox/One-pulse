import _ from 'lodash'
const PolicyAttributes = {
    PolicyNumber :"policyNo",
    PolicyId : "id",
    PolicyProduct : "product",
    PolicyProductOptions : "productOptions",
    PolicyProductComponentOptions : "productComponentOptions",
    PolicyPaymentOption : "paymentOption",
    PolicyReceivedDate : "receivedDate",
    PolicyEndDate : "endDate",
    PolicyDeliveryDate : "deliveryDate",
    PolicyStatus:"status",
    PolicyInceptionDate : "inceptionDate",
    PolicyEPolicyOption : "epolicyOption",
    PolicyBeneficiaries : "paymentOption",
    PolicyServingAgent : "servingAgents",
    PolicyEcards : "documents",
    PolicyTpa : "tpa",
    PolicyCustomerRoles : "customerRoles",
    Id:"id",
    FullName:"fullName",
    Desc:"desc",
    Status:"status",
    Code:"code",
    Name:"name",
    Policy:"policy",
    LifeAssured:"lifeAssured",
    ContactDetails:"contactDetails",
    Phone:"phone",
    Email:"email",
    Office:"office",
    Value:"value",
    Surname:'surName',
    DateOfBirth:"dob",
    RiderIsMedical:"isMedical",
    RiderComponent:"component",
    RiderComponentType:"componentType",
    RiderRiskCessDate:"riskCessDate",
    RiderCommencmentDate:"commencementDate",
    ComponentTypeHS:"HS",
    ComponentTypeHA:"HA",
    ComponentTypeHB:"HB",
    ProductComponent:"productComponent"

}
/**
 * Helper class to extract policy attributes.
 * Avoid all checks in UI , let lodash handle all of them
 * in UI only check for final attribute if null/undefined
 * 
 */
class PolicyInfoHelper {
    constructor(policy){
        this.policy=policy
    }

    /** Policy object would be set via constructor so here you need to pass only attribute that are required
     * E.g 
     * Direct attribute : getPolicyAttribute(['policyNo']) , 
     * Nested attribute : getPolicyAttribute['product','name']
     * Array attribute  : getPolicyAttribute[productOptions',0,'productComponentOptions'] 
    */
    getPolicyAttribute(attribute){
        return _.get(this.policy,attribute)
       }
 
    /** Returns all unique policy riders extracted from all policy product options  */
    getAllRiders(){
          let riders = []
          const productOptions = this.getPolicyAttribute([PolicyAttributes.PolicyProductOptions])
         // console.log(productOptions)
          if(productOptions){
              _.forEach(productOptions,productOption=>{
                 // console.log(productOption)
                  if(_.has(productOption,PolicyAttributes.PolicyProductComponentOptions)){
                      const productComponentOptions = productOption[PolicyAttributes.PolicyProductComponentOptions]
                      //console.log(productComponentOptions)
                      riders = _.flatten([productComponentOptions,riders])
                     }
              })
          }
          return _.uniqBy(riders,PolicyAttributes.Id);
      }
 
      getHARiders(){
         const allRiders = this.getAllRiders()
         const haRiders = _.filter(allRiders,_.iteratee([`${PolicyAttributes.RiderComponent}.${PolicyAttributes.RiderComponentType}`, 'HA']))
         return haRiders
      }
 
      getHBRiders(){
         const allRiders = this.getAllRiders()
         const hbRiders = _.filter(allRiders,_.iteratee([`${PolicyAttributes.RiderComponent}.${PolicyAttributes.RiderComponentType}`, 'HB']))
         return hbRiders
      }
 
      getHSRiders(){
         const allRiders = this.getAllRiders()
         const hsRiders = _.filter(allRiders,_.iteratee([`${PolicyAttributes.RiderComponent}.${PolicyAttributes.RiderComponentType}`, 'HS']))
         return hsRiders
      }

      getHAAndHSRiders(){
        const mergedRiders = _.flatten([this.getHARiders(),this.getHSRiders()])
        return _.uniqBy(mergedRiders,PolicyAttributes.Id)
        
      }

      getHAAndHBRiders(){
        const mergedRiders = _.flatten([this.getHARiders(),this.getHBRiders()])
        return _.uniqBy(mergedRiders,PolicyAttributes.Id)
       
      }

      getHBAndHsRiders(){
        const mergedRiders = _.flatten([this.getHBRiders(),this.getHSRiders()])
        return _.uniqBy(mergedRiders,PolicyAttributes.Id)
       
      }

      get_HA_HB_HS_Riders(){
        const mergedRiders = _.flatten([this.getHARiders(),this.getHSRiders(),this.getHBRiders()])
        return _.uniqBy(mergedRiders,PolicyAttributes.Id)
      }
 
      getAttribute(object,attributeName){
          return _.get(object,attributeName)
      }
}

export default PolicyInfoHelper