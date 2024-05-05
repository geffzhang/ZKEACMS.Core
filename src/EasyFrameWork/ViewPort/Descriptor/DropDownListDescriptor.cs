/* http://www.zkea.net/ 
 * Copyright (c) ZKEASOFT. All rights reserved. 
 * http://www.zkea.net/licenses */

using Easy.Constant;
using Easy.Modules.DataDictionary;
using System;
using System.Collections.Generic;
using System.Text;
using Easy.ViewPort.Validator;
using System.Reflection;
using Easy.Extend;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Easy.Modules.MutiLanguage;

namespace Easy.ViewPort.Descriptor
{
    public class DropDownListDescriptor : SelectDescriptor<DropDownListDescriptor>
    {
        public DropDownListDescriptor(Type modelType, string property)
            : base(modelType, property)
        {
        }

        public override HTMLEnumerate.HTMLTagTypes GetTagType()
        {
            return HTMLEnumerate.HTMLTagTypes.DropDownList;
        }
    }
}
