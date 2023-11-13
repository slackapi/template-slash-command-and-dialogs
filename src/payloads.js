module.exports = {
    confirmation: context => {
        return {
            channel: context.channel_id,
            text: 'Project created!',
            blocks: JSON.stringify([
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: '*Project created!*'
                    }
                },
                {
                    type: 'divider'
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*Title*\n${context.name}\n`
                    }
                },
                {
                    type: 'context',
                    elements: [
                        {
                            type: 'mrkdwn',
                            text: `*Business Unit*: ${context.bu}`
                        }
                    ]
                }
            ])
        }
    },
    modal: context => {
        return {
            trigger_id: context.trigger_id,
            view: JSON.stringify({
                type: 'modal',
                title: {
                    type: 'plain_text',
                    text: 'Propose Project'
                },
                callback_id: 'submit-ticket',
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                },
                blocks: [
                    {
                        block_id: 'bu_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Business Unit'
                        },
                        element: {
                            action_id: 'bu',
                            type: 'static_select',
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "AMER"
                                    },
                                    value: "amer"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "EMEA"
                                    },
                                    value: "emea"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "APAC"
                                    },
                                    value: "apac"
                                }
                            ]
                        },
                        optional: false
                    },
                    {
                        block_id: 'name_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Project Name'
                        },
                        element: {
                            action_id: 'name',
                            type: 'plain_text_input'
                        },
                        optional: false
                    },
                    {
                        block_id: 'type_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Type'
                        },
                        element: {
                            action_id: 'type',
                            type: 'static_select',
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Campaign"
                                    },
                                    value: "campaign"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Commerce"
                                    },
                                    value: "commerce"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Automation"
                                    },
                                    value: "automation"
                                }
                            ]
                        }
                    },
                    {
                        block_id: 'brief_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Brief'
                        },
                        element: {
                            action_id: 'brief',
                            type: 'plain_text_input'
                        },
                        optional: false
                    },
                    {
                        block_id: 'need_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Need'
                        },
                        element: {
                            action_id: 'need',
                            type: 'multi_static_select',
                            placeholder: {
                                type: 'plain_text',
                                text: 'Select needs'
                            },
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Copy"
                                    },
                                    value: "copy"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Creative"
                                    },
                                    value: "creative"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Journey"
                                    },
                                    value: "journey"
                                }
                            ]
                        },
                        optional: false
                    },
                    {
                        block_id: 'comm_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Communications'
                        },
                        element: {
                            action_id: 'communications',
                            type: 'number_input',
                            is_decimal_allowed: false
                        }
                    },
                    {
                        block_id: 'languages_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Languages'
                        },
                        element: {
                            action_id: 'languages',
                            type: 'multi_static_select',
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "English"
                                    },
                                    value: "english"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Spanish"
                                    },
                                    value: "spanish"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "French"
                                    },
                                    value: "french"
                                }
                            ]
                        }
                    },
                    {
                        block_id: 'objective_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Objective'
                        },
                        element: {
                            action_id: 'objective',
                            type: 'multi_static_select',
                            options: [
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "New Members"
                                    },
                                    value: "new_members"
                                },
                                {
                                    text: {
                                        type: "plain_text",
                                        text: "Cart Conversion"
                                    },
                                    value: "cart_conv"
                                }
                            ]
                        }
                    },
                    {
                        block_id: 'goal_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Goal'
                        },
                        element: {
                            action_id: 'goal',
                            type: 'number_input',
                            is_decimal_allowed: true
                        }
                    },
                    {
                        block_id: 'budget_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Budget'
                        },
                        element: {
                            action_id: 'budget',
                            type: 'number_input',
                            is_decimal_allowed: true
                        }
                    },
                    {
                        block_id: 'date_block',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Due Date'
                        },
                        element: {
                            action_id: 'date',
                            type: 'datepicker',
                            placeholder: {
                                type: 'plain_text',
                                text: 'Select a date'
                            }
                        }
                    }
                ]
            })
        }
    }
}