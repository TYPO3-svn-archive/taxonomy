<?php
/***************************************************************
*  Copyright notice
*
*  (c) 2011 Jochen Rau <jochen.rau@typoplanet.de>, typoplanet
*  	
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 3 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/


/**
 * Controller for the Concept object
 *
 * @version $Id$
 * @copyright Copyright belongs to the respective authors
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */

 class Tx_Taxonomy_Controller_ConceptController extends Tx_Extbase_MVC_Controller_ActionController {

	/**
	 * conceptRepository
	 *
	 * @var Tx_Taxonomy_Domain_Repository_ConceptRepository
	 */
	protected $conceptRepository;

	/**
	 * Initializes the current action
	 *
	 * @return void
	 */
	protected function initializeAction() {

		// Language inclusion
		global $LANG;
		$LANG->includeLLFile("EXT:taxonomy/Resources/Private/Language/locallang.xml");

		// Initialize Repository
		$this->conceptRepository = t3lib_div::makeInstance('Tx_Taxonomy_Domain_Repository_ConceptRepository');

		// Initilize properties
		$this->template = t3lib_div::makeInstance('template');
		$this->pageRenderer = $this->template->getPageRenderer();
		
		// Defines CSS + Javascript resource file
		$this->javascriptPath = t3lib_extMgm::extRelPath('taxonomy') . 'Resources/Public/JavaScript/';
		$this->stylesheetsPath = t3lib_extMgm::extRelPath('taxonomy') . 'Resources/Public/Media/StyleSheets/';
		$this->imagePath = t3lib_extMgm::extRelPath('taxonomy') . 'Resources/Public/Icons/';

		$this->loadStylesheets();
		$this->loadJavascript();
	}

	/**
	 * Displays all Concepts
	 *
	 * @return string The rendered list view
	 */
	public function listAction() {
		$concepts = $this->conceptRepository->findAll();
		
		if(count($concepts) < 1){
			$settings = $this->configurationManager->getConfiguration(Tx_Extbase_Configuration_ConfigurationManagerInterface::CONFIGURATION_TYPE_FRAMEWORK);
			if(empty($settings['persistence']['storagePid'])){
				$this->flashMessageContainer->add('No storagePid configured!');
			}
		}
		
		$this->view->assign('concepts', $concepts);
	}

	/**
	 * Load Javascript files onto the BE Module
	 *
	 * @return void
	 */
	protected function loadJavascript() {

		// *********************************** //
		// Load ExtCore library
		$this->pageRenderer->loadExtJS();
		$this->pageRenderer->enableExtJsDebug();

		// *********************************** //
		// Defines what files should be loaded and loads them
		$files = array();
		$files[] = 'Utility.js';

		// Application
		$files[] = 'Application.js';
		$files[] = 'Application/MenuRegistry.js';
		$files[] = 'Application/AbstractBootstrap.js';

		$files[] = 'Concept/ConceptTree.js';
		$files[] = 'Concept/ConceptGrid.js';

//		// Override
//		$files[] = 'Override/Chart.js';
//
		// Stores
//		$files[] = 'Stores/Bootstrap.js';
		$files[] = 'Stores/ConceptStore.js';
//
//		// User interfaces
		$files[] = 'UserInterface/Bootstrap.js';
		$files[] = 'UserInterface/ViewPort.js';
		$files[] = 'UserInterface/FitToParent.js';
//		$files[] = 'UserInterface/SectionMenu.js';
//
//		// Newsletter Planner
//		$files[] = 'Planner/Bootstrap.js';
//		$files[] = 'Planner/PlannerForm.js';
//		#$files[] = 'Planner/PlannerForm/PlannerTab.js';
//		#$files[] = 'Planner/PlannerForm/SettingsTab.js';
//		#$files[] = 'Planner/PlannerForm/StatusTab.js';
//
//		// Statistics
//		$files[] = 'Statistics/Bootstrap.js';
//		$files[] = 'Statistics/ModuleContainer.js';
//		$files[] = 'Statistics/NoStatisticsPanel.js';
//		$files[] = 'Statistics/StatisticsPanel.js';
//		$files[] = 'Statistics/NewsletterListMenu.js';
//		$files[] = 'Statistics/StatisticsPanel/OverviewTab.js';
//		$files[] = 'Statistics/StatisticsPanel/LinkTab.js';
//		$files[] = 'Statistics/StatisticsPanel/LinkTab/LinkGrid.js';
//		$files[] = 'Statistics/StatisticsPanel/LinkTab/LinkGraph.js';
//		$files[] = 'Statistics/StatisticsPanel/EmailTab.js';
//		$files[] = 'Statistics/StatisticsPanel/EmailTab/EmailGrid.js';
//		$files[] = 'Statistics/StatisticsPanel/EmailTab/EmailGraph.js';
//		$files[] = 'Statistics/StatisticsPanel/OverviewTab/General.js';
////		$files[] = 'Statistics/StatisticsPanel/OverviewTab/Graph.js';

		foreach ($files as $file) {
			$this->pageRenderer->addJsFile($this->javascriptPath . $file, 'text/javascript', FALSE);
		}

		// Add ExtJS API
		#$this->pageRenderer->addJsFile('ajax.php?ajaxID=ExtDirect::getAPI&namespace=TYPO3.Taxonomy', 'text/javascript', FALSE);

		#$numberOfStatistics = json_encode($this->statisticRepository->countStatistics($this->id));
		#TYPO3.Taxonomy.Data.numberOfStatistics = $numberOfStatistics;

		// *********************************** //
		// Defines onready Javascript
		$this->readyJavascript = array();
		$this->readyJavascript[] .= <<< EOF

			Ext.ns("TYPO3.Taxonomy.Data");
			TYPO3.Taxonomy.Data.imagePath = '$this->imagePath';

			// Enable our remote calls
			//for (var api in Ext.app.ExtDirectAPI) {
			//	Ext.Direct.addProvider(Ext.app.ExtDirectAPI[api]);
			//}
EOF;

		$this->pageRenderer->addExtOnReadyCode(PHP_EOL . implode("\n", $this->readyJavascript) . PHP_EOL);

		// *********************************** //
		// Defines contextual variables
		$labels = json_encode($this->getLabels());

		$this->inlineJavascript[] .= <<< EOF

		Ext.ns("TYPO3.Taxonomy");
		TYPO3.Taxonomy.Language = $labels;

EOF;
		$this->pageRenderer->addJsInlineCode('newsletter', implode("\n", $this->inlineJavascript));
	}

	/**
	 * Load Javascript files onto the BE Module
	 *
	 * @return void
	 */
	protected function loadStylesheets() {
		$this->pageRenderer->addCssFile($this->stylesheetsPath . 'Taxonomy.css');
	}
	
	/**
	 * Return labels in the form of an array
	 *
	 * @global Language $LANG
	 * @global array $LANG_LANG
	 * @return array
	 */
	protected function getLabels() {
		global $LANG;
		global $LOCAL_LANG;

		if (isset($LOCAL_LANG[$LANG->lang]) && !empty($LOCAL_LANG[$LANG->lang])) {
			$markers = $LOCAL_LANG[$LANG->lang];
			//$markers = $LANG->includeLLFile('EXT:devlog/Resources/Private/Language/locallang.xml', 0);
		}
		else {
			throw new Exception('No language file has been found', 1276451853);
		}
		return $markers;
	}

	/**
	 * Displays a single Concept
	 *
	 * @param Tx_Taxonomy_Domain_Model_Concept $concept the Concept to display
	 * @return string The rendered view
	 */
	public function showAction(Tx_Taxonomy_Domain_Model_Concept $concept) {
		$this->view->assign('concept', $concept);
	}

	/**
	 * Creates a new Concept and forwards to the list action.
	 *
	 * @param Tx_Taxonomy_Domain_Model_Concept $newConcept a fresh Concept object which has not yet been added to the repository
	 * @return string An HTML form for creating a new Concept
	 * @dontvalidate $newConcept
	 */
	public function newAction(Tx_Taxonomy_Domain_Model_Concept $newConcept = null) {
		$this->view->assign('newConcept', $newConcept);
	}

	/**
	 * Creates a new Concept and forwards to the list action.
	 *
	 * @param Tx_Taxonomy_Domain_Model_Concept $newConcept a fresh Concept object which has not yet been added to the repository
	 * @return void
	 */
	public function createAction(Tx_Taxonomy_Domain_Model_Concept $newConcept) {
		$this->conceptRepository->add($newConcept);
		$this->flashMessageContainer->add('Your new Concept was created.');
		
			
		
		$this->redirect('list');
	}

	/**
	 * Updates an existing Concept and forwards to the index action afterwards.
	 *
	 * @param Tx_Taxonomy_Domain_Model_Concept $concept the Concept to display
	 * @return string A form to edit a Concept
	 */
	public function editAction(Tx_Taxonomy_Domain_Model_Concept $concept) {
		$this->view->assign('concept', $concept);
	}

	/**
	 * Updates an existing Concept and forwards to the list action afterwards.
	 *
	 * @param Tx_Taxonomy_Domain_Model_Concept $concept the Concept to display
	 */
	public function updateAction(Tx_Taxonomy_Domain_Model_Concept $concept) {
		$this->conceptRepository->update($concept);
		$this->flashMessageContainer->add('Your Concept was updated.');
		$this->redirect('list');
	}

	/**
	 * Deletes an existing Concept
	 *
	 * @param Tx_Taxonomy_Domain_Model_Concept $concept the Concept to be deleted
	 * @return void
	 */
	public function deleteAction(Tx_Taxonomy_Domain_Model_Concept $concept) {
		$this->conceptRepository->remove($concept);
		$this->flashMessageContainer->add('Your Concept was removed.');
		$this->redirect('list');
	}

}
?>