from __future__ import division
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core import urlresolvers
from django.contrib import messages
from django.contrib.auth import authenticate, login as login_auth,logout
from django.core.urlresolvers import reverse
from django.db.models import Q
from django.contrib.auth.decorators import login_required
import json
from datetime import datetime, timedelta,date
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from amarApp.models import ContactUs
import logging
logger = logging.getLogger(__name__)

def index(request):
    """
    Amarlabs.in index page
    """
    return render(request, 'amarlabs/index.html',locals())
    
@csrf_exempt
def save_contactus(request):
    """
    contactus save page
    """
    is_success = 0
    msg=""
    if request.method == "POST":
    	customer_name = request.POST.get('customer_name','')
    	mobile_no = request.POST.get('mobile_no','')
    	email_id = request.POST.get('email_id','')
    	customer_message = request.POST.get('customer_message','')
    	try:
            contactus=ContactUs()
            contactus.customer_name = customer_name
            contactus.mobile_no = mobile_no
            contactus.email_id = email_id
            contactus.customer_message = customer_message
            contactus.save()
    	    is_success = 1
        except:
       	    logger.error("contact us error for user {0} phone {1} email {2}".format(customer_name,mobile_no,email_id,customer_message))

    else:
    	logger.info("Someone try to submit form as get method {0}".format(request.method))
    	msg="You are not a authorized user"

    result = {'is_success':is_success,'msg':msg}
    return HttpResponse(json.dumps(result),
            content_type="application/json")


