# Layers:

<ul>
    <li>View</li>
    <li>Application</li>
    <li>Infrastructure</li>
</ul>

## The View layer

### Sublayers:
<h3><b>Presentation</b></h3> 
It represents ui components that doesn't do lot of business logic and doesn't work directly with Api, store and Infrastructure player.

- CourseCard
- CoursesPage
- ListLessons
<h3><b>Container</b></h3> 
It knows and communicates with Application layer, Api and store.

- Main Page
- Course Page
- Not Found Page

## The Application layer

<h3><b>Hooks</b></h3> 
They know about Infrastructure layer and can work with it.

- useSelect

## The Infrastructure layer.
It is responsible for requests to the server, manage and save data.

<h3><b>Service/api/instance.ts</b></h3>
This is used solely for making API requests to a backend server. In this case, it provides a level of abstraction between the application and the server, allowing the application to make requests without having to worry about low-level details like handling HTTP status codes and formatting request data.

<h3><b>Redux</b></h3>
In this project is also used Redux as state management system. 
For corrcet work of the redux we should implement:

* asynActions
* slices
* store
* selectors

# Schema

<img src="public/hw5/arch.jpg"/>