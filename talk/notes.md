# Components Testing

# Design for Testability

## xUnit Test Patterns

### System Under de Test (SUT) 

- "Whatever thing we are testing" defined from the perspective of the test (Class, Object, Method)

### Front Door / Back Door

- Front Door : The public API of our SUT
- Back Door : An alternative interface to the SUT that test software can use to inject inputs into the SUT (eg: DB)

### Direct Inputs/Direct Outputs

- Direct Inputs : When the test interacts with the SUT directly via it's Front Door (or public API)
- Direct Outputs : Responses received by the test from the SUT via its Front Door (Values, Objects, Exceptions)

Calc.add(1, 2) => 3 : Direct Inputs / Direct Outputs

### Depended-on component (DOC)

- A component on which the SUT depends through delegation of responsibilities

### Indirect Inputs/Indirect Outputs

- Indirect Inputs : They are values returned by another component the SUT behavior depends on (We often use a Test Stub to inject the indirect inputs into the SUT)
- Indirect Outputs : Actions that cannot be observed through the public API of the SUT but which are seen or experienced by other systems or application components

OperationService.create(Operation, Correspondant) => DB record, JMS Message, Email notification, Log file entry

# Inputs/Outputs Big Pictures

# When Testing, it's all about Controlling input and observing output 

### Test fixture

A test fixture is all the things we need to have in place in order to run a test and expect a particular outcome:  Preconditions of the test

### Test Doubles (Imposters)

Whe we replace a component on which the SUT depends with a "test-specific equivalent" because:

- DOC isn't available
- DOC is slow
- DOC trigger unwanted processing (irrelevant for a specific test)
 
#### Variations of Test Doubles

- Stub : Replace a real component to control indirect inputs of the SUT, force the SUT to follow a specific path
- Spy : More capable version of a Test Stub. We use it as an observation point for the indirect outputs of the SUT. Like Stubs, it may need to provide values to the SUT in response to method calls but the Test Spy also captures the indirect outputs of the SUT as it is exercised and saves them for later verification by the test
- Mock : Used as an observation point that is used to verify the indirect outputs of the SUT as it is exercised. In plus of Stub functionality (returning values to SUT) the emphasis is verification of the indirect outputs (Stub + Assertion: the mock verifies it is being used correctly by the SUT.)
- Fake : Replace a real component by a much simpler one that implements same functionality 
- Dummy : Used to replace a required SUT DOC that doesn't affect the specific test case

Question to ask : Is our Test Double helping to inject Indirect Input, or is it helping to observe Indirect Output? Or is it simply there to replace a required dependency for which we don't want to use a real implementation?

### Four-Phase Test

Structure each test with four distinct parts executed in sequence :  

- Fixture setup (Preconditions, Test doubles)
- Exercise SUT (Interact, stimulate)
- Result verification (Assertions)
- Fixture teardown (Restore the world back into the state in which you found it)

### State / Behavior Verification

- State Verification : Make the Self-Checking Test to inspect the state of the SUT after it has been exercised and compare it to the expected state
- Behavior Verification : Used when there is no state to verify, capture the indirect outputs of the SUT as they occur and compare them to the expected behavior

Behavior Verification almost always involves interacting with or replacing a depended-on component (DOC) that the SUT interacts with at run time.

We can use Behavior Verification any time the SUT calls methods on other objects or components; we must use Behavior Verification whenever the expected outputs of the SUT are transient and cannot be determined simply by looking at the post-exercise state of the SUT or the DOC.

## F.I.R.S.T Principles

- Fast : Run tests quickly (since we will be running them all the time)  
- Isolated/Independent : Do not relay on a global state, No order-of-run dependency, Must not fail because a dependency failed
- Repeatable : Run N times, get same result even if we change the environment (to help isolate bugs and enable automation)
- Self-checking : Test can automatically detect if it pass or fail (No human checking of output)
- Timely : Tests must be written at the right time, just before the production code (To avoid ending up with a code hard to test)
 
# General

## Excuses

- Legacy code-base
- UI can't be tested
- Slower, code hard to change, too meny deps

### Making code hard to test

- Location of new Operators
- Work in constructor
- Global state

# Test Startegy

http://xunitpatterns.com/TestStrategy.html


# Components

## What's wrong with MVC

- Controllers load data from Model and are paired with specific Views (templates which more and more complex)
- Mostly one active controller at a time (One controller by route)
- How to make controllers communicate?
- How to organize views?
- How to tests?

## Component-based design

- Defining a set of components, for every UI element, screen, and route
- Component focus on a View's state and behavior
- An application will always have a root component that contains all other components (tree)
- A component has input and output properties, it's the public API of the component (Needs to be well-defined)
- A component has a template, which describes how the component is rendered on the page
- Components have a well-defined lifecycle, which we can tap into to execute custom logic (eg: initialised, rendered, destroyed...)
- A component can interact with its host DOM element (listen to events, update its properties, invoke methods on it)


<app />  : 
```
<div id="app">
  <app-nav />
  <app-view>
    <app-sidebar />
    <app-content />
  </app-view>
</div>
```

## Benifits

- Break down complex Controller/Template into small simple Components
- Components are Self-contained, can be bootstrapped as an application, loaded as a route, or used in some other components directly
- Components are reusable 
- Easy to scale large applications
- Not worrying about context really simplifies testing

## Atomic Design

Chemistry metaphor to describe Components, provide semantic rules and principles of organization for interface elements

PatternLab (Static Site Generator) http://patternlab.io/about.html

- Atoms:
 * The basic building blocks
 * Can't be broken down further without losing their meaning
 * Have no dependencies on the rest of the app
 
- Molecules: 
 * Groups of elements that function together as a unit
 * Building up from atoms to molecules encourages a “do one thing and do it well” mentality
 
- Organisms : 
 * Groups of molecules (and possibly atoms) joined together to form distinct section of an interface.
 * Building up from molecules to organisms encourages creating standalone, portable, reusable components.

- Templates : 
 * Mostly focus on content structure rather than the actual content.
 * Comprised mostly of organisms combined together to form page-level objects.
 
- Pages : Specific instances of templates, concrete final form with data

Tweaked Atomic Design for SPA

- Atoms
- Molecules
- Organisms
- Ecosystem : 
 * Container composed of multiple organism components
 * Organize, manage, and delegate messages to organism components (Nested ecosystem should never directly communicate)
- Environment :
 * We compose multiple ecosystems into a single environment, the application.
 
## Parent-Child Communication

- Components must have a well-defined public API
- Components must provide an interface boundary definition that specifies what inputs and outputs the component works with
- Nested Components communicate through the high-level parent 
- Avoid directly relying on parent data in a child component (parent and child tightly coupled

It's a bad idea to mutate parent state from a child component, because:

- It makes the parent and child tightly coupled;
- It makes the parent state much harder to reason about when looking at it alone, because its state may be modified by any child! Ideally, only a component itself should be allowed to modify its own state

## Communication through Publisher/Subscriber

The event system must be independent from the native DOM : No need of DOM to test

Each Component is an event emitter that can:

- Listen to event
- Listen to data change
- Emit events

# Testing

## What we test

What does a component do

The Component is not directly responsible for querying/updating

A Componet idially :

- Show a visualisation of the abstract data
- Provide the user with a way to interact with the system
- Communicate with other Components


## Atomic Web Design

http://bradfrost.com/blog/post/atomic-web-design/

- Atoms: 
 - Have no dependencies on the rest of the app
 - Rarely have their own state

Parent Child communication
http://vuejs.org/guide/components.html#Parent-Child_Communication

