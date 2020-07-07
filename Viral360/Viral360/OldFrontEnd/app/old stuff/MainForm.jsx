import React from 'react';
import { Op } from 'react-dynamics';
import { Context } from 'react-collectable';

import Spinner from './Spinner.jsx';

require('./MainForm.scss');

function MainForm({
    action,
    then,
    success,
    submitText,
    errorText,
    children
}) {
    return <Op
        action={action}
        then={then}
    >
        {(currentOp, lastOp) =>
            (success && lastOp && !lastOp.isError) ? success() : <Context>
                {/* eslint-disable no-script-url */}
                {(collect) =>
                    <form
                        className="main-form"
                        onSubmit={() => currentOp.invoke(collect())}
                        action="javascript:void(0)"
                    >
                        {lastOp && lastOp.isError && (!lastOp.value || !lastOp.isInputError)
                            ? <div className="_error">
                                {typeof errorText === 'function'
                                    ? errorText(lastOp.value)
                                    : errorText
                                }
                            </div>
                            : null
                        }
                        {children}
                        <div className="_button-wrapper">
                            <button disabled={currentOp.isPending}>{submitText}</button>
                        </div>
                        {currentOp.isPending
                            ? <div className="_spinner-overlay"><Spinner/></div>
                            : null
                        }
                    </form>
                }
                {/* eslint-enable no-script-url */}
            </Context>
        }
    </Op>;
}

export default MainForm;
