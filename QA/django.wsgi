import os
import sys
import time
import traceback
import signal

current_directory = os.path.dirname(__file__)
parent_directory = os.path.dirname(current_directory)
module_name = os.path.basename(current_directory)

sys.path.append(parent_directory)
sys.path.append(current_directory)
os.environ['DJANGO_SETTINGS_MODULE'] = '%s.settings' % module_name

from django.core.wsgi import get_wsgi_application
try:
    application = get_wsgi_application()
    print 'WSGI without exception'
except Exception:
    print 'handling WSGI exception'
    # Error loading applications
    if 'mod_wsgi' in sys.modules:
        traceback.print_exc()
        os.kill(os.getpid(), signal.SIGINT)
        time.sleep(2.5)
