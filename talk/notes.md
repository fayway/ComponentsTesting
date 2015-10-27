# Components Testing

# Design for Testability

## xUnit Test Patterns

### System Under de Test (SUT) 

* "Whatever thing we are testing" defined from the perspective of the test (Class, Object, Method)

### Front Door / Back Door

* Front Door : The public API of our SUT
* Back Door : An alternative interface to the SUT that test software can use to inject inputs into the SUT (eg: DB)

### Direct Inputs/Direct Outputs

* Direct Inputs : When the test interacts with the SUT directly via it's Front Door (or public API)
* Direct Outputs : Responses received by the test from the SUT via its Front Door (Values, Objects, Exceptions)

Calc.add(1, 2) => 3 : Direct Inputs / Direct Outputs

### Depended-on component (DOC)

* A component on which the SUT depends through delegation of responsibilities

### Indirect Inputs/Indirect Outputs

* Indirect Inputs : They are values returned by another component the SUT behavior depends on (We often use a Test Stub to inject the indirect inputs into the SUT)
* Indirect Outputs : Actions that cannot be observed through the public API of the SUT but which are seen or experienced by other systems or application components

OperationService.create(Operation, Correspondant) => DB record, JMS Message, Email notification, Log file entry

# Inputs/Outputs Big Pictures

# When Testing, it's all about Controlling input and observing output 

### Test fixture

A test fixture is all the things we need to have in place in order to run a test and expect a particular outcome:  Preconditions of the test

### State / Behavior Verification

@TODO 

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

Question to ask : Is our Test Double helping to inject Indirect Input, or is it helping to observe Indirect Output? Or is it simply there to replace a required dependency for which we don’t want to use a real implementation?

### Four-Phase Test

Structure each test with four distinct parts executed in sequence :  

- Fixture setup (Preconditions, Test doubles)
- Exercise SUT (Interact, stimulate)
- Result verification (Assertions)
- Fixture teardown (Restore the world back into the state in which you found it)






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