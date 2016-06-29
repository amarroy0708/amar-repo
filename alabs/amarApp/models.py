from django.db import models

COMMON_STATUS=(
              (0,'INACTIVE'),
              (1,'ACTIVE'),
              )

CONTACT_STATUS=(
              (0,'Not Contacted'),
              (1,'Contacted'),
              (1,'Interested'),
              (1,'Not Interested'),
              )

class BaseInfo(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    status = models.IntegerField(default=1,choices=COMMON_STATUS,help_text='Category Status')

    class Meta:
        abstract = True	

class ContactUs(BaseInfo):
    customer_name = models.CharField(max_length=128,null=True,blank=True,help_text='Customer Name')
    mobile_no = models.CharField(max_length=512,null=True,blank=True,help_text='Customer Mobile NO')
    email_id = models.EmailField(null=True,blank=True,max_length=128,help_text='Customer Email')
    customer_message = models.TextField(null=True,blank=True,help_text='Customer Message')
    remarks = models.TextField(null=True,blank=True,help_text='Customer Feedback')
    contact_status =  models.IntegerField(default=0,choices=CONTACT_STATUS,help_text='Contact Status')

    def __unicode__(self):
       return "%s_%s" %(self.customer_name if self.customer_name else "NA",self.mobile_no if self.mobile_no else "NA")
