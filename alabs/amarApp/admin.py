from django.contrib import admin
from amarApp.models import ContactUs

class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('customer_name','mobile_no','email_id','customer_message','remarks')
    search_fields = ['customer_name','mobile_no','email_id','customer_message']
    list_filter = ('created_date','contact_status')
admin.site.register(ContactUs,ContactUsAdmin)
