from selenium import webdriver
import unittest


class NewVisitorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_can_start_a_list_and_retrieve_it_later(self):
        # A government partner has heard about a tool that can make it easier
        # to plan acquisitions and gather requirements a la the Digital Services
        # Playbook.
        self.browser.get('http://localhost:5000')

        # She notices that the page title and header mention the name of the app.
        self.assertIn('Playbook in Action', self.browser.title)


if __name__ == '__main__':
    unittest.main()
