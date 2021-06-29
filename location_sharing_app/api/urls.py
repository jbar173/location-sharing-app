from django.conf.urls import url
from . import views

app_name = 'api'

urlpatterns = [

    url(r'^$',views.apiOverview,name="overview"),
    url(r'^user-list/$',views.UserList.as_view(),name="user_list"),
    url(r'^location-list/$',views.LocationList.as_view(),name="location_list"),
    url(r'^user-detail/(?P<id>\d+)/$',views.userDetail,name="user_detail"),
    url(r'^location-detail/(?P<id>\d+)/$',views.locationDetail,name="location_detail"),
    url(r'^create-user/$',views.CreateUser.as_view(),name="create_user"),
    url(r'^update-user/(?P<id>\d+)/$',views.updateUser,name="update_user"),
    url(r'^create-location/$',views.CreateLocation.as_view(),name="create_location"),

]
