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


#Components

Why Components
http://vuejs.org/guide/overview.html#Component_System


Express templates via modules that returns Pure Components

Not worrying about context really simplifies testing and also makes the composition task a charm.

## What we test : What does component do

The Component is not responsible for adding the selected item to the shopping cart. Its task is to show a visualisation of the abstract data and provide the user with a way to interact with the system.

## Atomic Web Design

http://bradfrost.com/blog/post/atomic-web-design/

- Atoms: 
 - Have no dependencies on the rest of the app
 - Rarely have their own state

Parent Child communication
http://vuejs.org/guide/components.html#Parent-Child_Communication

